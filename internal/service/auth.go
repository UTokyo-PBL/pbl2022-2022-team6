package service

import (
	"context"

	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/model"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/repository"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/ptr"
)

func Register(ctx context.Context, repo repository.Interface, user *api.User) (*api.Message, error) {
	u, err := model.UserFromAPI(user)
	if err != nil {
		return nil, errors.Wrap(err, "Register failed to model.UserFromAPI")
	}

	if err := repo.CreateUser(ctx, u); err != nil {
		return nil, errors.Wrap(err, "Register failed to repo.CreateUser")
	}

	return &api.Message{
		Message: ptr.String("successfully registered"),
	}, nil
}

func Login(ctx context.Context, repo repository.Interface, user *api.User) (*api.Message, string, error) {
	if user.Email == nil || *user.Email == "" {
		return nil, "", errors.New("email cannot be null")
	}
	u, err := repo.SelectUserByUsernameOrEmail(ctx, *user.Email)
	if err != nil {
		return nil, "", errors.Wrap(err, "Login failed to repo.SelectUserByUsernameOrEmail")
	}

	// パスワード認証
	if user.Password == nil || *user.Password == "" {
		return nil, "", errors.New("password cannot be null")
	}
	if ok := u.IsValidPassword(*user.Password); !ok {
		return nil, "", errors.New("invalid password")
	}

	// セッション追加
	session, err := repo.CreateNewSession(ctx, u.ID)
	if err != nil {
		return nil, "", err
	}

	msg := "successfully logged in"

	return &api.Message{
		Message: &msg,
	}, session, nil
}

func Logout(ctx context.Context, repo repository.Interface, userID string) (*api.Message, error) {
	if err := repo.DeleteOneSessionByUserID(ctx, userID); err != nil {
		return nil, errors.Wrap(err, "Logout failed to repo.DeleteOneSessionByUserID")
	}

	msg := "successfully logged out"

	return &api.Message{
		Message: &msg,
	}, nil
}
