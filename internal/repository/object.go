package repository

import (
	"context"
	"database/sql"

	"github.com/pkg/errors"
	"golang.org/x/sync/errgroup"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/daocore"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/model"
)

func (c *Client) CreateObject(ctx context.Context, object *model.Object) error {
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  false,
	})
	if err != nil {
		return errors.Wrap(err, "CreateObject failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	if err := daocore.InsertObject(ctx, txn, []*daocore.Object{object.ObjectDAO()}); err != nil {
		return errors.Wrap(err, "CreateObject failed to daocore.InsertObject")
	}
	if err := daocore.InsertObjtxt(ctx, txn, object.AllObjtxtsDAO()); err != nil {
		return errors.Wrap(err, "CreateObject failed to daocore.InsertObjtxt")
	}
	if err := daocore.InsertObjectTargetObjtxt(ctx, txn, object.ObjectTargetObjtxtsDAO()); err != nil {
		return errors.Wrap(err, "CreateObject failed to daocore.InsertObjectTargetObjtxt")
	}

	if err := txn.Commit(); err != nil {
		return errors.Wrap(err, "CreateObject failed to txn.Commit")
	}

	return nil
}

func (c *Client) UpdateObject(ctx context.Context, id string, object *model.Object) error {
	if id != object.ID {
		return errors.Errorf("UpdateObject: User %s cannot update object ")
	}
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  false,
	})
	if err != nil {
		return errors.Wrap(err, "UpdateObject failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	if err := daocore.UpdateObject(ctx, txn, *object.ObjectDAO()); err != nil {
		return errors.Wrap(err, "UpdateObject failed to daocore.UpdateObject")
	}
	if err := daocore.UpdateObjtxt(ctx, txn, *object.OriginalObjtxtsDAO()); err != nil {
		return errors.Wrap(err, "UpdateObject failed to daocore.UpdateObjtxt")
	}
	if err := daocore.DeleteObjectTargetObjtxtByObjectID(ctx, txn, &object.ID); err != nil {
		return errors.Wrap(err, "UpdateObject failed to daocore.DeleteObjectTargetObjtxtByObjectID")
	}
	for _, t := range object.TargetObjtxtsDAO() {
		if err := daocore.DeleteOneObjtxtByID(ctx, txn, &t.ID); err != nil {
			return errors.Wrap(err, "UpdateObject failed to daocore.daocore.DeleteOneObjtxtByID")
		}
	}
	if err := daocore.InsertObjtxt(ctx, txn, object.TargetObjtxtsDAO()); err != nil {
		return errors.Wrap(err, "UpdateObject failed to daocore.InsertObjtxt")
	}
	if err := daocore.InsertObjectTargetObjtxt(ctx, txn, object.ObjectTargetObjtxtsDAO()); err != nil {
		return errors.Wrap(err, "UpdateObject failed to daocore.InsertObjectTargetObjtxt")
	}

	if err := txn.Commit(); err != nil {
		return errors.Wrap(err, "UpdateObject failed to txn.Commit")
	}

	return nil
}

func (c *Client) DeleteObject(ctx context.Context, id string, object *model.Object) error {
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  false,
	})
	if err != nil {
		return errors.Wrap(err, "DeleteObject failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	if err := daocore.DeleteOneObjectByID(ctx, txn, &id); err != nil {
		return errors.Wrap(err, "DeleteObject failed to daocore.DeleteOneObject")
	}
	if err := daocore.DeleteOneObjtxtByID(ctx, txn, &object.Original.ID); err != nil {
		return errors.Wrap(err, "DeleteObject failed to daocore.DeleteOneObjtxtByID")
	}
	if err := daocore.DeleteObjectTargetObjtxtByObjectID(ctx, txn, &id); err != nil {
		return errors.Wrap(err, "DeleteObject failed to daocore.DeleteObjectTargetObjtxtByObjectID")
	}
	for _, t := range object.Target {
		if err := daocore.DeleteOneObjtxtByID(ctx, txn, &t.ID); err != nil {
			return errors.Wrap(err, "DeleteObject failed to daocore.DeleteOneObjtxtByID")
		}
	}

	if err := txn.Commit(); err != nil {
		return errors.Wrap(err, "DeleteObject failed to txn.Commit")
	}

	return nil
}

func (c *Client) SelectObjectByID(ctx context.Context, id string) (*model.Object, error) {
	var ok1, ok2, ok3, ok4 bool
	var o daocore.Object
	var oo daocore.Objtxt
	var tos []*daocore.Objtxt

	eg, ctx := errgroup.WithContext(ctx)
	eg.Go(func() error {
		txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
			Isolation: sql.LevelDefault,
			ReadOnly:  true,
		})
		if err != nil {
			return errors.Wrap(err, "SelectObjectByID failed to c.db.BeginTx")
		}
		defer txn.Rollback()

		o, err = daocore.SelectOneObjectByID(ctx, txn, &id)
		switch true {
		case err != nil && !errors.Is(err, sql.ErrNoRows):
			return err
		case err != nil && errors.Is(err, sql.ErrNoRows):
			return nil
		}

		ok1 = true

		oo, err = daocore.SelectOneObjtxtByID(ctx, txn, &o.OriginalOjbtxtID)
		switch true {
		case err != nil && !errors.Is(err, sql.ErrNoRows):
			return err
		case err != nil && errors.Is(err, sql.ErrNoRows):
			return nil
		}

		ok2 = true
		return nil
	})
	eg.Go(func() error {
		txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
			Isolation: sql.LevelDefault,
			ReadOnly:  true,
		})
		if err != nil {
			return errors.Wrap(err, "SelectObjectByID failed to c.db.BeginTx")
		}
		defer txn.Rollback()

		ots, err := daocore.SelectObjectTargetObjtxtByObjectID(ctx, txn, &id)
		switch true {
		case err != nil && !errors.Is(err, sql.ErrNoRows):
			return err
		case err != nil && errors.Is(err, sql.ErrNoRows):
			return nil
		}

		ok3 = true

		ids := make([]string, 0, len(ots))
		for _, ot := range ots {
			ids = append(ids, ot.TargetObjtxtID)
		}

		tos, err = daocore.SelectObjtxtsByIDs(ctx, txn, ids)
		switch true {
		case err != nil && !errors.Is(err, sql.ErrNoRows):
			return err
		case err != nil && errors.Is(err, sql.ErrNoRows):
			return nil
		}

		ok4 = true
		return nil
	})

	if err := eg.Wait(); err != nil {
		return nil, errors.Wrap(err, "SelectObjectByID failed to eg.Wait")
	}
	switch true {
	case !ok1:
		return nil, errors.Wrapf(sql.ErrNoRows, "SelectObjectByID failed to find object %s on daocore.SelectOneObjectByID", id)
	case !ok2:
		return nil, errors.Wrapf(sql.ErrNoRows, "SelectObjectByID failed to find object %s on daocore.SelectOneObjtxtByID", id)
	case !ok3:
		return nil, errors.Wrapf(sql.ErrNoRows, "SelectObjectByID failed to find object %s on daocore.SelectObjectTargetObjtxtByObjectID", id)
	case !ok4:
		return nil, errors.Wrapf(sql.ErrNoRows, "SelectObjectByID failed to find object %s on daocore.SelectObjtxtsByIDs", id)
	}

	return model.ObjectFromDAO(&o, &oo, tos), nil
}

func (c *Client) SelectObjectsByUserID(ctx context.Context, userID string) ([]*model.Object, error) {
	txn, err := c.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelDefault,
		ReadOnly:  true,
	})
	if err != nil {
		return nil, errors.Wrap(err, "SelectObjectsByUserID failed to c.db.BeginTx")
	}
	defer txn.Rollback()

	os, err := daocore.SelectObjectByUserID(ctx, txn, &userID)

	objects := make([]*model.Object, 0, len(os))

	for _, o := range os {
		object, err := c.SelectObjectByID(ctx, o.ID)
		if err != nil {
			return nil, err
		}
		objects = append(objects, object)
	}

	return objects, nil
}
