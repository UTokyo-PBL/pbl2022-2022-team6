// Code generated by "script/dtogen". DO NOT EDIT.
package daocore

import (
	"context"
	"database/sql"
	"strings"
	"time"

	"github.com/Masterminds/squirrel"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/dberror"
)

const ObjectTableName = "objects"

var ObjectAllColumns = []string{
	"id",
	"user_id",
	"original_ojbtxt_id",
	"bbox_x",
	"bbox_y",
	"bbox_w",
	"bbox_h",
	"image_url",
	"caption",
	"country",
	"city",
	"latitude",
	"longitude",
	"liked",
	"num_failures",
	"created_at",
	"updated_at",
}

var ObjectColumnsWOMagics = []string{
	"id",
	"user_id",
	"original_ojbtxt_id",
	"bbox_x",
	"bbox_y",
	"bbox_w",
	"bbox_h",
	"image_url",
	"caption",
	"country",
	"city",
	"latitude",
	"longitude",
	"liked",
	"num_failures",
}

var ObjectPrimaryKeyColumns = []string{
	"id",
}

type Object struct {
	ID               string
	UserID           string
	OriginalOjbtxtID int
	BboxX            float32
	BboxY            float32
	BboxW            float32
	BboxH            float32
	ImageUrl         string
	Caption          string
	Country          string
	City             string
	Latitude         float32
	Longitude        float32
	Liked            int
	NumFailure       int
	CreatedAt        *time.Time
	UpdatedAt        *time.Time
}

func (t *Object) Values() []interface{} {
	return []interface{}{
		t.ID,
		t.UserID,
		t.OriginalOjbtxtID,
		t.BboxX,
		t.BboxY,
		t.BboxW,
		t.BboxH,
		t.ImageUrl,
		t.Caption,
		t.Country,
		t.City,
		t.Latitude,
		t.Longitude,
		t.Liked,
		t.NumFailure,
	}
}

func (t *Object) SetMap() map[string]interface{} {
	return map[string]interface{}{
		"id":                 t.ID,
		"user_id":            t.UserID,
		"original_ojbtxt_id": t.OriginalOjbtxtID,
		"bbox_x":             t.BboxX,
		"bbox_y":             t.BboxY,
		"bbox_w":             t.BboxW,
		"bbox_h":             t.BboxH,
		"image_url":          t.ImageUrl,
		"caption":            t.Caption,
		"country":            t.Country,
		"city":               t.City,
		"latitude":           t.Latitude,
		"longitude":          t.Longitude,
		"liked":              t.Liked,
		"num_failures":       t.NumFailure,
	}
}

func (t *Object) Ptrs() []interface{} {
	return []interface{}{
		&t.ID,
		&t.UserID,
		&t.OriginalOjbtxtID,
		&t.BboxX,
		&t.BboxY,
		&t.BboxW,
		&t.BboxH,
		&t.ImageUrl,
		&t.Caption,
		&t.Country,
		&t.City,
		&t.Latitude,
		&t.Longitude,
		&t.Liked,
		&t.NumFailure,
		&t.CreatedAt,
		&t.UpdatedAt,
	}
}

func IterateObject(sc interface{ Scan(...interface{}) error }) (Object, error) {
	t := Object{}
	if err := sc.Scan(t.Ptrs()...); err != nil {
		return Object{}, dberror.MapError(err)
	}
	return t, nil
}

func SelectAllObject(ctx context.Context, txn *sql.Tx) ([]*Object, error) {
	query, params, err := squirrel.
		Select(ObjectAllColumns...).
		From(ObjectTableName).
		ToSql()
	if err != nil {
		return nil, dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return nil, dberror.MapError(err)
	}

	rows, err := stmt.QueryContext(ctx, params...)
	if err != nil {
		return nil, dberror.MapError(err)
	}
	res := make([]*Object, 0)
	for rows.Next() {
		t, err := IterateObject(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func SelectOneObjectByOriginalOjbtxtID(ctx context.Context, txn *sql.Tx, original_ojbtxt_id *int) (Object, error) {
	eq := squirrel.Eq{}
	if original_ojbtxt_id != nil {
		eq["original_ojbtxt_id"] = *original_ojbtxt_id
	}
	query, params, err := squirrel.
		Select(ObjectAllColumns...).
		From(ObjectTableName).
		Where(eq).
		ToSql()
	if err != nil {
		return Object{}, dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return Object{}, dberror.MapError(err)
	}
	return IterateObject(stmt.QueryRowContext(ctx, params...))
}

func SelectOneObjectByID(ctx context.Context, txn *sql.Tx, id *string) (Object, error) {
	eq := squirrel.Eq{}
	if id != nil {
		eq["id"] = *id
	}
	query, params, err := squirrel.
		Select(ObjectAllColumns...).
		From(ObjectTableName).
		Where(eq).
		ToSql()
	if err != nil {
		return Object{}, dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return Object{}, dberror.MapError(err)
	}
	return IterateObject(stmt.QueryRowContext(ctx, params...))
}

func SelectObjectsByIDs(ctx context.Context, txn *sql.Tx, ids []string) ([]*Object, error) {
	query, params, err := squirrel.
		Select(ObjectAllColumns...).
		From(ObjectTableName).
		Where(squirrel.Eq{
			"id": ids,
		}).
		ToSql()
	if err != nil {
		return nil, dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return nil, dberror.MapError(err)
	}

	rows, err := stmt.QueryContext(ctx, params...)
	if err != nil {
		return nil, dberror.MapError(err)
	}
	res := make([]*Object, 0)
	for rows.Next() {
		t, err := IterateObject(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func InsertObject(ctx context.Context, txn *sql.Tx, records []*Object) error {
	for i := range records {
		if records[i] == nil {
			records = append(records[:i], records[i+1:]...)
		}
	}
	if len(records) == 0 {
		return nil
	}
	sq := squirrel.Insert(ObjectTableName).Columns(ObjectColumnsWOMagics...)
	for _, r := range records {
		if r == nil {
			continue
		}
		sq = sq.Values(r.Values()...)
	}
	query, params, err := sq.ToSql()
	if err != nil {
		return err
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return dberror.MapError(err)
	}
	if _, err = stmt.Exec(params...); err != nil {
		return dberror.MapError(err)
	}
	return nil
}

func UpdateObject(ctx context.Context, txn *sql.Tx, record Object) error {
	sql, params, err := squirrel.Update(ObjectTableName).SetMap(record.SetMap()).
		Where(squirrel.Eq{
			"id": record.ID,
		}).
		ToSql()
	if err != nil {
		return err
	}
	stmt, err := txn.PrepareContext(ctx, sql)
	if err != nil {
		return dberror.MapError(err)
	}
	if _, err = stmt.Exec(params...); err != nil {
		return dberror.MapError(err)
	}
	return nil
}

func UpsertObject(ctx context.Context, txn *sql.Tx, record Object) error {
	updateSQL, params, err := squirrel.Update(ObjectTableName).SetMap(record.SetMap()).ToSql()
	if err != nil {
		return err
	}
	updateSQL = strings.TrimPrefix(updateSQL, "UPDATE "+ObjectTableName+" SET ")
	query, params, err := squirrel.Insert(ObjectTableName).Columns(ObjectColumnsWOMagics...).Values(record.Values()...).SuffixExpr(squirrel.Expr("ON DUPLICATE KEY UPDATE "+updateSQL, params...)).ToSql()
	if err != nil {
		return err
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return dberror.MapError(err)
	}
	if _, err = stmt.Exec(params...); err != nil {
		return dberror.MapError(err)
	}
	return nil
}

func TruncateObject(ctx context.Context, txn *sql.Tx) error {
	query := "TRUNCATE TABLE " + ObjectTableName
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return dberror.MapError(err)
	}
	if _, err = stmt.Exec(); err != nil {
		return dberror.MapError(err)
	}
	return nil
}

func DeleteOneObjectByOriginalOjbtxtID(ctx context.Context, txn *sql.Tx, original_ojbtxt_id *int) error {
	eq := squirrel.Eq{}
	if original_ojbtxt_id != nil {
		eq["original_ojbtxt_id"] = *original_ojbtxt_id
	}

	query, params, err := squirrel.
		Delete(ObjectTableName).
		Where(eq).
		ToSql()
	if err != nil {
		return dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return dberror.MapError(err)
	}
	if _, err = stmt.Exec(params...); err != nil {
		return dberror.MapError(err)
	}
	return nil
}

func DeleteOneObjectByID(ctx context.Context, txn *sql.Tx, id *string) error {
	eq := squirrel.Eq{}
	if id != nil {
		eq["id"] = *id
	}

	query, params, err := squirrel.
		Delete(ObjectTableName).
		Where(eq).
		ToSql()
	if err != nil {
		return dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return dberror.MapError(err)
	}
	if _, err = stmt.Exec(params...); err != nil {
		return dberror.MapError(err)
	}
	return nil
}
