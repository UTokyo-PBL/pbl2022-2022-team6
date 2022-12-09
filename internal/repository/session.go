package repository

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/daocore"
)

func (c *Client) CreateNewSession(ctx context.Context, userID string) (string, error) {
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  false,
	})
	if err != nil {
		return "", errors.Wrap(err, "CreateNewSession failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	if err := daocore.DeleteOneSessionByUserID(ctx, txn, &userID); err != nil {
		return "", errors.Wrap(err, "CreateNewSession failed to daocore.DeleteOneSessionByUserID")
	}
	session := uuid.NewString()
	if err := daocore.InsertSession(ctx, txn, []*daocore.Session{
		{
			Session: session,
			UserID:  userID,
		},
	}); err != nil {
		return "", errors.Wrap(err, "CreateNewSession failed to daocore.InsertSession")
	}

	if err := txn.Commit(); err != nil {
		return "", errors.Wrap(err, "CreateNewSession failed to txn.Commit")
	}

	return session, nil
}

func (c *Client) DeleteOneSessionByUserID(ctx context.Context, userID string) error {
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  false,
	})
	if err != nil {
		return errors.Wrap(err, "DeleteOneSessionByUserID failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	if err := daocore.DeleteOneSessionByUserID(ctx, txn, &userID); err != nil {
		return errors.Wrap(err, "DeleteOneSessionByUserID failed to daocore.DeleteOneSessionByUserID")
	}

	if err := txn.Commit(); err != nil {
		return errors.Wrap(err, "DeleteOneSessionByUserID failed to txn.Commit")
	}

	return nil
}
