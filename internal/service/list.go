package service

import (
	"context"
	"math/rand"
	"time"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/model"

	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/repository"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/failures"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/ptr"
)

func ListLists(ctx context.Context, repo repository.Interface, userID string) (*api.Lists, error) {
	object, err := repo.ListObjectsByUserID(ctx, userID)

	if err != nil {
		err = errors.Wrap(err, "ListLists failed to repo.SelectObjectsByUserID")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	objects := make([]api.Object, 0, len(object))
	for _, o := range object {
		objects = append(objects, *o.API())
	}

	ls, err := repo.ListListsByUserID(ctx, userID)
	if err != nil {
		err = errors.Wrap(err, "ListLists failed to repo.ListListsByUserID")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	lists := make([]api.List, 0, len(ls))
	for _, l := range ls {
		lists = append(lists, *l.API())
	}

	total := 1 + len(lists)

	return &api.Lists{
		DefaultList: &api.List{
			IconName: ptr.String("all"),
			Name:     ptr.String("all"),
			Objects:  &objects,
		},
		CustomLists: &lists,
		Total:       &total,
	}, nil
}

func PostList(ctx context.Context, repo repository.Interface, userID string, list *api.List) (*api.Message, error) {
	l, err := model.ListFromAPI(userID, list)
	if err != nil {
		err = errors.Wrap(err, "PostList failed to model.ListFromAPI")
		return nil, errors.Wrap(failures.InvalidListParams, err.Error())
	}

	if err := repo.CreateList(ctx, l); err != nil {
		err = errors.Wrap(err, "PostList failed to repo.CreateList")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully inserted"),
	}, nil
}

func GetListByRandom(ctx context.Context, repo repository.Interface, userID, id string, num int) (*api.List, error) {
	list, err := repo.SelectListByID(ctx, id)

	if err != nil {
		err = errors.Wrap(err, "GetList failed to repo.SelectListByID")
		return nil, errors.Wrap(failures.ResourceNotFound, err.Error())
	}

	if list.UserID != userID {
		err = errors.Wrapf(err, "GetList: User %s have no access to %s ", userID, id)
		return nil, errors.Wrap(failures.InvalidListAccess, err.Error())
	}

	l := list.API()

	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(*l.Objects), func(i, j int) {
		(*l.Objects)[i], (*l.Objects)[j] = (*l.Objects)[j], (*l.Objects)[i]
	})

	if len(*l.Objects) > num {
		*l.Objects = (*l.Objects)[:num]
	}

	return list.API(), nil
}

func DeleteList(ctx context.Context, repo repository.Interface, userID, id string) (*api.Message, error) {
	list, err := repo.SelectListByID(ctx, id)

	if err != nil {
		err = errors.Wrap(err, "DeleteList failed to repo.SelectListByID")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	if list.UserID != userID {
		err = errors.Wrapf(err, "DeleteList: User %s have no access to %s ", userID, id)
		return nil, errors.Wrap(failures.InvalidListAccess, err.Error())
	}

	if err := repo.DeleteList(ctx, id, list); err != nil {
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully deleted"),
	}, nil
}

func UpdateList(ctx context.Context, repo repository.Interface, userID, id string, list *api.List) (*api.Message, error) {
	l, err := model.ListFromAPI(userID, list)
	if err != nil {
		err = errors.Wrap(err, "UpdateList failed to model.ListFromAPI")
		return nil, errors.Wrap(failures.InvalidListParams, err.Error())
	}

	if err := repo.UpdateList(ctx, id, l); err != nil {
		err = errors.Wrap(err, "UpdateList failed to repo.UpdateList")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully updated"),
	}, nil
}
