package repository

import (
	"context"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/model"
)

func (c *Client) ListLanguages(ctx context.Context) ([]string, error) {
	//TODO implement me
	panic("implement me")
}

func (c *Client) CreateUser(ctx context.Context, user *model.User) error {
	//TODO implement me
	panic("implement me")
}

func (c *Client) SelectUserByUsernameOrEmail(ctx context.Context, q string) (*model.User, error) {
	//TODO implement me
	panic("implement me")
}

func (c *Client) CreateNewSession(ctx context.Context, userID string) (string, error) {
	//TODO implement me
	panic("implement me")
}

func (c *Client) DeleteOneSessionByUserID(ctx context.Context, userID string) error {
	//TODO implement me
	panic("implement me")
}
