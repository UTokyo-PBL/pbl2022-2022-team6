package repository

import (
	"context"
	"database/sql"

	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/daocore"
)

func (c *Client) ListLanguages(ctx context.Context) ([]string, error) {
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  true,
	})
	if err != nil {
		return nil, errors.Wrap(err, "ListLanguages failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	languages, err := daocore.SelectAllLanguage(ctx, txn)
	if err != nil {
		return nil, errors.Wrap(err, "ListLanguages failed to daocore.SelectAllLanguage")
	}

	ls := make([]string, 0, len(languages))
	for _, l := range languages {
		ls = append(ls, l.Language)
	}

	return ls, nil
}
