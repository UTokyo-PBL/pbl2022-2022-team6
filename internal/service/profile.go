package service

import (
	"context"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/model"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/ptr"

	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/failures"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/repository"
)

func GetProfile(ctx context.Context, repo repository.Interface, userID string) (*api.User, error) {
	user, err := repo.SelectUserByID(ctx, userID)

	if err != nil {
		err = errors.Wrap(err, "GetProfile failed to repo.SelectUserByID")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return user.API(), nil
}

func PutProfile(ctx context.Context, repo repository.Interface, userID string, user *api.User) (*api.Message, error) {
	u, err := model.UserFromAPI(user)
	if err != nil {
		err = errors.Wrap(err, "PutProfile failed to model.UserFromAPI")
		return nil, errors.Wrap(failures.InvalidUserParams, err.Error())
	}

	if err := repo.UpdateUser(ctx, userID, u); err != nil {
		err = errors.Wrap(err, "PutProfile failed to repo.UpdateUser")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully updated"),
	}, nil
}

func PutPreferredLanguages(ctx context.Context, repo repository.Interface, userID string, languages *api.PreferredLanguages) (*api.Message, error) {
	if languages == nil || languages.Languages == nil {
		err := errors.New("PutPreferredLanguages : languages cannot be null")
		return nil, errors.Wrap(failures.InvalidUserParams, err.Error())
	}

	user, err := repo.SelectUserByID(ctx, userID)

	if err != nil {
		err = errors.Wrap(err, "PutPreferredLanguages failed to repo.SelectUserByID")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	user.PreferredLanguages = *languages.Languages

	if err := repo.UpdateUser(ctx, userID, user); err != nil {
		err = errors.Wrap(err, "PutPreferredLanguages failed to repo.UpdateUser")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully updated"),
	}, nil
}
