package repository

import (
	"context"
	"database/sql"

	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/daocore"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/model"
)

func (c *Client) CreateUser(ctx context.Context, user *model.User) error {
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  false,
	})
	if err != nil {
		return errors.Wrap(err, "CreateUser failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	if err := daocore.InsertUser(ctx, txn, []*daocore.User{user.ToDAO()}); err != nil {
		return errors.Wrap(err, "CreateUser failed to daocore.InsertUser")
	}

	if err := txn.Commit(); err != nil {
		return errors.Wrap(err, "CreateUser failed to txn.Commit")
	}

	return nil
}

func (c *Client) SelectUserByUsernameOrEmail(ctx context.Context, q string) (*model.User, error) {
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  true,
	})
	if err != nil {
		return nil, errors.Wrap(err, "SelectUserByUsernameOrEmail failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	var u daocore.User

	ok, err := func() (bool, error) {
		u, err = daocore.SelectOneUserByEmail(ctx, txn, &q)

		switch true {
		case err == nil:
			return true, nil
		case err != nil && errors.Is(err, sql.ErrNoRows):
			return false, nil
		default:
			return false, err
		}
	}()
	if err != nil {
		return nil, errors.Wrap(err, "SelectUserByUsernameOrEmail failed to daocore.SelectOneUserByEmail")
	}
	if ok {
		return model.UserFromDAO(&u), nil
	}

	ok, err = func() (bool, error) {
		u, err = daocore.SelectOneUserByUsername(ctx, txn, &q)

		switch true {
		case err == nil:
			return true, nil
		case err != nil && errors.Is(err, sql.ErrNoRows):
			return false, nil
		default:
			return false, err
		}
	}()
	if err != nil {
		return nil, errors.Wrap(err, "SelectUserByUsernameOrEmail failed to daocore.SelectOneUserByUsername")
	}
	if ok {
		return model.UserFromDAO(&u), nil
	}

	return nil, errors.Wrapf(sql.ErrNoRows, "SelectUserByUsernameOrEmail failed to find user %s", q)
}
