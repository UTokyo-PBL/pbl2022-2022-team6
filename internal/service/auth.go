package service

import (
	"context"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/failures"

	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/model"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/repository"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/ptr"
)

func Register(ctx context.Context, repo repository.Interface, user *api.User) (*api.Message, error) {
	u, err := model.UserFromAPI(user)
	if err != nil {
		err = errors.Wrap(err, "Register failed to model.UserFromAPI")
		return nil, errors.Wrap(failures.InvalidUserParams, err.Error())
	}

	if err := repo.CreateUser(ctx, u); err != nil {
		err = errors.Wrap(err, "Register failed to repo.CreateUser")
		return nil, errors.Wrap(failures.UserAlreadyExists, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully registered"),
	}, nil
}

func Login(ctx context.Context, repo repository.Interface, user *api.User) (*api.Message, string, error) {
	if user.Email == nil || *user.Email == "" {
		err := errors.New("Login: email cannot be null")
		return nil, "", errors.Wrap(failures.InvalidUserParams, err.Error())
	}
	u, err := repo.SelectUserByUsernameOrEmail(ctx, *user.Email)
	if err != nil {
		err = errors.Wrap(err, "Login failed to repo.SelectUserByUsernameOrEmail")
		return nil, "", errors.Wrap(failures.UserNotExists, err.Error())
	}

	// パスワード認証
	if user.Password == nil || *user.Password == "" {
		err = errors.New("Login: password cannot be null")
		return nil, "", errors.Wrap(failures.InvalidUserParams, err.Error())
	}
	if ok := u.IsValidPassword(*user.Password); !ok {
		err = errors.New("Login: invalid password")
		return nil, "", errors.Wrap(failures.InvalidPassword, err.Error())
	}

	// セッション追加
	session, err := repo.CreateNewSession(ctx, u.ID)
	if err != nil {
		err = errors.Wrap(err, "Login failed to repo.CreateNewSession")
		return nil, "", errors.Wrap(failures.UnknownError, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully logged in"),
	}, session, nil
}

func Logout(ctx context.Context, repo repository.Interface, userID string) (*api.Message, error) {
	if err := repo.DeleteOneSessionByUserID(ctx, userID); err != nil {
		err = errors.Wrap(err, "Logout failed to repo.DeleteOneSessionByUserID")
		return nil, errors.Wrap(failures.UnknownError, err.Error())
	}

	return &api.Message{
		Message: ptr.String("successfully logged out"),
	}, nil
}
