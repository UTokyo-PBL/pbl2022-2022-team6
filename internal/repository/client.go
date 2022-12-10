package repository

import (
	"context"
	"database/sql"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/model"
)

type Interface interface {
	ListLanguages(ctx context.Context) ([]string, error)
	CreateUser(ctx context.Context, user *model.User) error
	UpdateUser(ctx context.Context, id string, user *model.User) error
	SelectUserByID(ctx context.Context, id string) (*model.User, error)
	SelectUserByUsernameOrEmail(ctx context.Context, q string) (*model.User, error)
	CreateNewSession(ctx context.Context, userID string) (string, error)
	DeleteOneSessionByUserID(ctx context.Context, userID string) error
}

type Client struct {
	db *sql.DB
}

func New(db *sql.DB) Interface {
	return &Client{
		db: db,
	}
}
