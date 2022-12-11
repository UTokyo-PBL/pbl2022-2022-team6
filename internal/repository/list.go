package repository

import (
	"context"
	"database/sql"

	"golang.org/x/sync/errgroup"

	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/daocore"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/model"
)

func (c *Client) CreateList(ctx context.Context, list *model.List) error {
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  false,
	})
	if err != nil {
		return errors.Wrap(err, "CreateList failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	if err := daocore.InsertList(ctx, txn, []*daocore.List{list.ListDAO()}); err != nil {
		return errors.Wrap(err, "CreateList failed to daocore.InsertList")
	}
	if err := daocore.InsertListObject(ctx, txn, list.ListObjectsDAO()); err != nil {
		return errors.Wrap(err, "CreateList failed to daocore.InsertListObject")
	}

	if err := txn.Commit(); err != nil {
		return errors.Wrap(err, "CreateList failed to txn.Commit")
	}

	return nil
}

func (c *Client) UpdateList(ctx context.Context, id string, list *model.List) error {
	if id != list.ID {
		return errors.Errorf("UpdateList: cannot update list %s's into %s", id, list.ID)
	}
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  false,
	})
	if err != nil {
		return errors.Wrap(err, "UpdateList failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	if err := daocore.UpdateList(ctx, txn, *list.ListDAO()); err != nil {
		return errors.Wrap(err, "UpdateList failed to daocore.UpdateList")
	}
	if err := daocore.DeleteListObjectByListID(ctx, txn, &id); err != nil {
		return errors.Wrap(err, "UpdateList failed to daocore.DeleteListObjectByListID")
	}
	if err := daocore.InsertListObject(ctx, txn, list.ListObjectsDAO()); err != nil {
		return errors.Wrap(err, "UpdateList failed to daocore.InsertListObject")
	}

	if err := txn.Commit(); err != nil {
		return errors.Wrap(err, "UpdateList failed to txn.Commit")
	}

	return nil
}

func (c *Client) DeleteList(ctx context.Context, id string, list *model.List) error {
	if id != list.ID {
		return errors.Errorf("DeleteList: cannot update list %s's into %s", id, list.ID)
	}
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  false,
	})
	if err != nil {
		return errors.Wrap(err, "DeleteList failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	if err := daocore.DeleteOneListByID(ctx, txn, &id); err != nil {
		return errors.Wrap(err, "DeleteList failed to daocore.DeleteOneListByID")
	}
	if err := daocore.DeleteListObjectByListID(ctx, txn, &id); err != nil {
		return errors.Wrap(err, "DeleteList failed to daocore.DeleteListObjectByListID")
	}

	if err := txn.Commit(); err != nil {
		return errors.Wrap(err, "DeleteList failed to txn.Commit")
	}

	return nil
}

func (c *Client) SelectListByID(ctx context.Context, id string) (*model.List, error) {
	var ok1, ok2, ok3 bool
	var l daocore.List

	os := make([]*model.Object, 0)

	eg, ctx := errgroup.WithContext(ctx)
	eg.Go(func() error {
		txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
			Isolation: sql.LevelDefault,
			ReadOnly:  true,
		})
		if err != nil {
			return errors.Wrap(err, "SelectListByID failed to c.db.BeginTx")
		}
		defer txn.Rollback()

		l, err = daocore.SelectOneListByID(ctx, txn, &id)
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
		txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
			Isolation: sql.LevelDefault,
			ReadOnly:  true,
		})
		if err != nil {
			return errors.Wrap(err, "SelectListByID failed to c.db.BeginTx")
		}
		defer txn.Rollback()

		los, err := daocore.SelectListObjectByListID(ctx, txn, &id)
		switch true {
		case err != nil && !errors.Is(err, sql.ErrNoRows):
			return err
		case err != nil && errors.Is(err, sql.ErrNoRows):
			return nil
		}

		ok2 = true

		for _, lo := range los {
			o, err := c.SelectObjectByID(ctx, lo.ObjectID)
			if err != nil {
				return errors.Wrap(err, "SelectListByID failed to c.SelectObjectByID")
			}
			os = append(os, o)
		}

		ok3 = true
		return nil
	})

	if err := eg.Wait(); err != nil {
		return nil, errors.Wrap(err, "SelectListByID failed to eg.Wait")
	}
	switch true {
	case !ok1:
		return nil, errors.Wrapf(sql.ErrNoRows, "SelectListByID failed to find object %s on daocore.SelectOneListByID", id)
	case !ok2:
		return nil, errors.Wrapf(sql.ErrNoRows, "SelectListByID failed to find object %s on daocore.SelectListObjectByListID", id)
	case !ok3:
		return nil, errors.Wrapf(sql.ErrNoRows, "SelectListByID failed to find object %s on c.SelectObjectByID", id)
	}

	return model.ListFromDAO(&l, os), nil
}

func (c *Client) ListListsByUserID(ctx context.Context, userID string) ([]*model.List, error) {
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  true,
	})
	if err != nil {
		return nil, errors.Wrap(err, "ListListsByUserID failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	ls, err := daocore.SelectListByUserID(ctx, txn, &userID)

	lists := make([]*model.List, 0, len(ls))

	for _, l := range ls {
		list, err := c.SelectListByID(ctx, l.ID)
		if err != nil {
			return nil, err
		}
		lists = append(lists, list)
	}

	return lists, nil
}
