package repository

import (
	"context"
	"database/sql"
	"golang.org/x/sync/errgroup"

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

	if err := daocore.InsertUser(ctx, txn, []*daocore.User{user.ToUserDAO()}); err != nil {
		return errors.Wrap(err, "CreateUser failed to daocore.InsertUser")
	}
	if err := daocore.InsertUserPreferredLanguage(ctx, txn, user.ToUserPreferredLanguagesDAO()); err != nil {
		return errors.Wrap(err, "CreateUser failed to daocore.InsertUserPreferredLanguage")
	}

	if err := txn.Commit(); err != nil {
		return errors.Wrap(err, "CreateUser failed to txn.Commit")
	}

	return nil
}

func (c *Client) SelectUserByID(ctx context.Context, id string) (*model.User, error) {
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  true,
	})
	if err != nil {
		return nil, errors.Wrap(err, "SelectUserByID failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	var ok1, ok2 bool
	var u daocore.User
	var ps []*daocore.UserPreferredLanguage

	eg, ctx := errgroup.WithContext(ctx)
	eg.Go(func() error {
		u, err = daocore.SelectOneUserByID(ctx, txn, &id)
		switch true {
		case err != nil && !errors.Is(err, sql.ErrNoRows):
			return err
		case err != nil && errors.Is(err, sql.ErrNoRows):
			return nil
		}
		ok1 = true
		return nil
	})
	eg.Go(func() error {
		ps, err = daocore.SelectUserPreferredLanguageByUserID(ctx, txn, &id)
		switch true {
		case err != nil && !errors.Is(err, sql.ErrNoRows):
			return err
		case err != nil && errors.Is(err, sql.ErrNoRows):
			return nil
		}
		ok2 = true
		return nil
	})

	if err := eg.Wait(); err != nil {
		return nil, errors.Wrap(err, "SelectUserByID failed to eg.Wait")
	}
	if !ok1 || !ok2 {
		return nil, errors.Wrapf(sql.ErrNoRows, "SelectUserByID failed to find user %s", id)
	}

	return model.UserFromDAO(&u, ps), nil
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
	var ps []*daocore.UserPreferredLanguage

	ok, err := func() (bool, error) {
		u, err = daocore.SelectOneUserByEmail(ctx, txn, &q)
		switch true {
		case err != nil && !errors.Is(err, sql.ErrNoRows):
			return false, err
		case err != nil && errors.Is(err, sql.ErrNoRows):
			return false, nil
		}

		ps, err = daocore.SelectUserPreferredLanguageByUserID(ctx, txn, &u.ID)
		switch true {
		case err != nil && !errors.Is(err, sql.ErrNoRows):
			return false, err
		case err != nil && errors.Is(err, sql.ErrNoRows):
			return false, nil
		}

		return true, nil
	}()
	if err != nil {
		return nil, errors.Wrap(err, "SelectUserByUsernameOrEmail failed to daocore.SelectOneUserByEmail")
	}
	if ok {
		return model.UserFromDAO(&u, ps), nil
	}

	ok, err = func() (bool, error) {
		u, err = daocore.SelectOneUserByUsername(ctx, txn, &q)
		switch true {
		case err != nil && !errors.Is(err, sql.ErrNoRows):
			return false, err
		case err != nil && errors.Is(err, sql.ErrNoRows):
			return false, nil
		}

		ps, err = daocore.SelectUserPreferredLanguageByUserID(ctx, txn, &u.ID)
		switch true {
		case err != nil && !errors.Is(err, sql.ErrNoRows):
			return false, err
		case err != nil && errors.Is(err, sql.ErrNoRows):
			return false, nil
		}

		return true, nil
	}()
	if err != nil {
		return nil, errors.Wrap(err, "SelectUserByUsernameOrEmail failed to daocore.SelectOneUserByUsername")
	}
	if ok {
		return model.UserFromDAO(&u, ps), nil
	}

	return nil, errors.Wrapf(sql.ErrNoRows, "SelectUserByUsernameOrEmail failed to find user %s", q)
}
