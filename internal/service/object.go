package service

import (
	"context"

	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/httpclient/detection"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/httpclient/translation"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/model"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/repository"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/failures"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/ptr"
)

func ListObjects(ctx context.Context, repo repository.Interface, userID string) ([]*api.Object, error) {
	objects, err := repo.SelectObjectsByUserID(ctx, userID)

	if err != nil {
		err = errors.Wrap(err, "ListObjects failed to repo.SelectObjectsByUserID")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	res := make([]*api.Object, 0, len(objects))
	for _, o := range objects {
		res = append(res, o.API())
	}

	return res, nil
}

func DetectObject(
	ctx context.Context,
	detectionClient detection.Interface,
	translationClient translation.Interface,
	repo repository.Interface,
	userID string,
	object *api.Object,
) (*api.Message, error) {
	o, err := model.ObjectFromAPI(userID, object)
	if err != nil {
		err = errors.Wrap(err, "PostObject failed to model.ObjectFromAPI")
		return nil, errors.Wrap(failures.InvalidObjectParams, err.Error())
	}

	// detection
	bbox, err := detectionClient.Detect(ctx, o.ImageURL)
	if err != nil {
		err = errors.Wrap(err, "PostObject failed to detectionClient.Detect")
		return nil, errors.Wrap(failures.DetectionFailed, err.Error())
	}
	o.BBox.X = float32(bbox.X)
	o.BBox.Y = float32(bbox.Y)
	o.BBox.W = float32(bbox.W)
	o.BBox.H = float32(bbox.H)
	o.Original.Text = bbox.Name

	// translation
	for _, t := range o.Target {
		l, err := translationClient.Translate(ctx, o.Original.Text, o.Original.Language, t.Language)
		if err != nil {
			err = errors.Wrap(err, "PostObject failed to translationClient.Detect")
			return nil, errors.Wrap(failures.TranslationFailed, err.Error())
		}
		t.Text = l
	}

	if err := repo.CreateObject(ctx, o); err != nil {
		err = errors.Wrap(err, "PostObject failed to repo.CreateObject")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully inserted"),
	}, nil
}

func TranslateObject(
	ctx context.Context,
	translationClient translation.Interface,
	repo repository.Interface,
	userID string,
	object *api.Object,
) (*api.Message, error) {
	o, err := model.ObjectFromAPI(userID, object)
	if err != nil {
		err = errors.Wrap(err, "PostObject failed to model.ObjectFromAPI")
		return nil, errors.Wrap(failures.InvalidObjectParams, err.Error())
	}

	if o.Original.Text == "" {
		return nil, errors.Wrap(failures.InvalidObjectParams, err.Error())
	}

	for _, t := range o.Target {
		l, err := translationClient.Translate(ctx, o.Original.Text, o.Original.Language, t.Language)
		if err != nil {
			err = errors.Wrap(err, "PostObject failed to translationClient.Detect")
			return nil, errors.Wrap(failures.TranslationFailed, err.Error())
		}
		t.Text = l
	}

	if err := repo.CreateObject(ctx, o); err != nil {
		err = errors.Wrap(err, "PostObject failed to repo.CreateObject")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully inserted"),
	}, nil
}

func GetObject(ctx context.Context, repo repository.Interface, userID, id string) (*api.Object, error) {
	object, err := repo.SelectObjectByID(ctx, id)

	if object.UserID != userID {
		err = errors.Wrapf(err, "GetObject: User %s have no access to %s ", userID, id)
		return nil, errors.Wrap(failures.InvalidObjectParams, err.Error())
	}

	if err != nil {
		err = errors.Wrap(err, "GetObject failed to repo.SelectObjectByID")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return object.API(), nil
}

func UpdateCaption(ctx context.Context, repo repository.Interface, userID, id, caption string) (*api.Message, error) {
	object, err := repo.SelectObjectByID(ctx, id)

	if object.UserID != userID {
		err = errors.Wrapf(err, "UpdateCaption: User %s have no access to %s", userID, id)
		return nil, errors.Wrap(failures.InvalidObjectParams, err.Error())
	}

	object.Caption = caption

	if err := repo.UpdateObject(ctx, id, object); err != nil {
		err = errors.Wrap(err, "UpdateCaption failed to repo.UpdateObject")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully updated"),
	}, nil
}

func UpdateLiked(ctx context.Context, repo repository.Interface, userID, id string, liked bool) (*api.Message, error) {
	object, err := repo.SelectObjectByID(ctx, id)

	if object.UserID != userID {
		err = errors.Wrapf(err, "UpdateLiked: User %s have no access to %s", userID, id)
		return nil, errors.Wrap(failures.InvalidObjectParams, err.Error())
	}

	object.Liked = liked

	if err := repo.UpdateObject(ctx, id, object); err != nil {
		err = errors.Wrap(err, "UpdateCaption failed to repo.UpdateObject")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully updated"),
	}, nil
}

func UpdateNumFailures(ctx context.Context, repo repository.Interface, userID, id string, numFailures int) (*api.Message, error) {
	object, err := repo.SelectObjectByID(ctx, id)

	if object.UserID != userID {
		err = errors.Wrapf(err, "UpdateLiked: User %s have no access to %s", userID, id)
		return nil, errors.Wrap(failures.InvalidObjectParams, err.Error())
	}

	object.NumFailures = numFailures

	if err := repo.UpdateObject(ctx, id, object); err != nil {
		err = errors.Wrap(err, "UpdateLiked failed to repo.UpdateObject")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully updated"),
	}, nil
}

func UpdateOriginal(ctx context.Context, translationClient translation.Interface, repo repository.Interface, userID, id string, original *api.Objtxt) (*api.Message, error) {
	object, err := repo.SelectObjectByID(ctx, id)

	if object.UserID != userID {
		err = errors.Wrapf(err, "UpdateOriginal: User %s have no access to %s", userID, id)
		return nil, errors.Wrap(failures.InvalidObjectParams, err.Error())
	}

	if original.Language != nil {
		object.Original.Language = *original.Language
	}
	if original.Text != nil {
		object.Original.Text = *original.Text
	}

	for _, t := range object.Target {
		l, err := translationClient.Translate(ctx, object.Original.Text, object.Original.Language, t.Language)
		if err != nil {
			err = errors.Wrap(err, "PostObject failed to translationClient.Detect")
			return nil, errors.Wrap(failures.TranslationFailed, err.Error())
		}
		t.Text = l
	}

	if err := repo.UpdateObject(ctx, id, object); err != nil {
		err = errors.Wrap(err, "UpdateLiked failed to repo.UpdateObject")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully updated"),
	}, nil
}
