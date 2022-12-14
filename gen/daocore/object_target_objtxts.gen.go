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

const ObjectTargetObjtxtTableName = "object_target_objtxts"

var ObjectTargetObjtxtAllColumns = []string{
	"id",
	"object_id",
	"target_objtxt_id",
	"created_at",
	"updated_at",
}

var ObjectTargetObjtxtColumnsWOMagics = []string{
	"id",
	"object_id",
	"target_objtxt_id",
}

var ObjectTargetObjtxtPrimaryKeyColumns = []string{
	"id",
}

type ObjectTargetObjtxt struct {
	ID             int
	ObjectID       string
	TargetObjtxtID string
	CreatedAt      *time.Time
	UpdatedAt      *time.Time
}

func (t *ObjectTargetObjtxt) Values() []interface{} {
	return []interface{}{
		t.ID,
		t.ObjectID,
		t.TargetObjtxtID,
	}
}

func (t *ObjectTargetObjtxt) SetMap() map[string]interface{} {
	return map[string]interface{}{
		"id":               t.ID,
		"object_id":        t.ObjectID,
		"target_objtxt_id": t.TargetObjtxtID,
	}
}

func (t *ObjectTargetObjtxt) Ptrs() []interface{} {
	return []interface{}{
		&t.ID,
		&t.ObjectID,
		&t.TargetObjtxtID,
		&t.CreatedAt,
		&t.UpdatedAt,
	}
}

func IterateObjectTargetObjtxt(sc interface{ Scan(...interface{}) error }) (ObjectTargetObjtxt, error) {
	t := ObjectTargetObjtxt{}
	if err := sc.Scan(t.Ptrs()...); err != nil {
		return ObjectTargetObjtxt{}, dberror.MapError(err)
	}
	return t, nil
}

func SelectAllObjectTargetObjtxt(ctx context.Context, txn *sql.Tx) ([]*ObjectTargetObjtxt, error) {
	query, params, err := squirrel.
		Select(ObjectTargetObjtxtAllColumns...).
		From(ObjectTargetObjtxtTableName).
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
	res := make([]*ObjectTargetObjtxt, 0)
	for rows.Next() {
		t, err := IterateObjectTargetObjtxt(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func SelectOneObjectTargetObjtxtByObjectIDAndTargetObjtxtID(ctx context.Context, txn *sql.Tx, object_id *string, target_objtxt_id *string) (ObjectTargetObjtxt, error) {
	eq := squirrel.Eq{}
	if object_id != nil {
		eq["object_id"] = *object_id
	}
	if target_objtxt_id != nil {
		eq["target_objtxt_id"] = *target_objtxt_id
	}
	query, params, err := squirrel.
		Select(ObjectTargetObjtxtAllColumns...).
		From(ObjectTargetObjtxtTableName).
		Where(eq).
		ToSql()
	if err != nil {
		return ObjectTargetObjtxt{}, dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return ObjectTargetObjtxt{}, dberror.MapError(err)
	}
	return IterateObjectTargetObjtxt(stmt.QueryRowContext(ctx, params...))
}

func SelectObjectTargetObjtxtByObjectID(ctx context.Context, txn *sql.Tx, object_id *string) ([]*ObjectTargetObjtxt, error) {
	eq := squirrel.Eq{}
	if object_id != nil {
		eq["object_id"] = *object_id
	}
	query, params, err := squirrel.
		Select(ObjectTargetObjtxtAllColumns...).
		From(ObjectTargetObjtxtTableName).
		Where(eq).
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
	res := make([]*ObjectTargetObjtxt, 0)
	for rows.Next() {
		t, err := IterateObjectTargetObjtxt(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func SelectObjectTargetObjtxtByTargetObjtxtID(ctx context.Context, txn *sql.Tx, target_objtxt_id *string) ([]*ObjectTargetObjtxt, error) {
	eq := squirrel.Eq{}
	if target_objtxt_id != nil {
		eq["target_objtxt_id"] = *target_objtxt_id
	}
	query, params, err := squirrel.
		Select(ObjectTargetObjtxtAllColumns...).
		From(ObjectTargetObjtxtTableName).
		Where(eq).
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
	res := make([]*ObjectTargetObjtxt, 0)
	for rows.Next() {
		t, err := IterateObjectTargetObjtxt(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func SelectOneObjectTargetObjtxtByID(ctx context.Context, txn *sql.Tx, id *int) (ObjectTargetObjtxt, error) {
	eq := squirrel.Eq{}
	if id != nil {
		eq["id"] = *id
	}
	query, params, err := squirrel.
		Select(ObjectTargetObjtxtAllColumns...).
		From(ObjectTargetObjtxtTableName).
		Where(eq).
		ToSql()
	if err != nil {
		return ObjectTargetObjtxt{}, dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return ObjectTargetObjtxt{}, dberror.MapError(err)
	}
	return IterateObjectTargetObjtxt(stmt.QueryRowContext(ctx, params...))
}

func SelectObjectTargetObjtxtsByIDs(ctx context.Context, txn *sql.Tx, ids []int) ([]*ObjectTargetObjtxt, error) {
	query, params, err := squirrel.
		Select(ObjectTargetObjtxtAllColumns...).
		From(ObjectTargetObjtxtTableName).
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
	res := make([]*ObjectTargetObjtxt, 0)
	for rows.Next() {
		t, err := IterateObjectTargetObjtxt(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func InsertObjectTargetObjtxt(ctx context.Context, txn *sql.Tx, records []*ObjectTargetObjtxt) error {
	for i := range records {
		if records[i] == nil {
			records = append(records[:i], records[i+1:]...)
		}
	}
	if len(records) == 0 {
		return nil
	}
	sq := squirrel.Insert(ObjectTargetObjtxtTableName).Columns(ObjectTargetObjtxtColumnsWOMagics...)
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

func UpdateObjectTargetObjtxt(ctx context.Context, txn *sql.Tx, record ObjectTargetObjtxt) error {
	sql, params, err := squirrel.Update(ObjectTargetObjtxtTableName).SetMap(record.SetMap()).
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

func UpsertObjectTargetObjtxt(ctx context.Context, txn *sql.Tx, record ObjectTargetObjtxt) error {
	updateSQL, params, err := squirrel.Update(ObjectTargetObjtxtTableName).SetMap(record.SetMap()).ToSql()
	if err != nil {
		return err
	}
	updateSQL = strings.TrimPrefix(updateSQL, "UPDATE "+ObjectTargetObjtxtTableName+" SET ")
	query, params, err := squirrel.Insert(ObjectTargetObjtxtTableName).Columns(ObjectTargetObjtxtColumnsWOMagics...).Values(record.Values()...).SuffixExpr(squirrel.Expr("ON DUPLICATE KEY UPDATE "+updateSQL, params...)).ToSql()
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

func TruncateObjectTargetObjtxt(ctx context.Context, txn *sql.Tx) error {
	query := "TRUNCATE TABLE " + ObjectTargetObjtxtTableName
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return dberror.MapError(err)
	}
	if _, err = stmt.Exec(); err != nil {
		return dberror.MapError(err)
	}
	return nil
}

func DeleteOneObjectTargetObjtxtByObjectIDAndTargetObjtxtID(ctx context.Context, txn *sql.Tx, object_id *string, target_objtxt_id *string) error {
	eq := squirrel.Eq{}
	if object_id != nil {
		eq["object_id"] = *object_id
	}
	if target_objtxt_id != nil {
		eq["target_objtxt_id"] = *target_objtxt_id
	}

	query, params, err := squirrel.
		Delete(ObjectTargetObjtxtTableName).
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

func DeleteObjectTargetObjtxtByObjectID(ctx context.Context, txn *sql.Tx, object_id *string) error {
	eq := squirrel.Eq{}
	if object_id != nil {
		eq["object_id"] = *object_id
	}

	query, params, err := squirrel.
		Delete(ObjectTargetObjtxtTableName).
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

func DeleteObjectTargetObjtxtByTargetObjtxtID(ctx context.Context, txn *sql.Tx, target_objtxt_id *string) error {
	eq := squirrel.Eq{}
	if target_objtxt_id != nil {
		eq["target_objtxt_id"] = *target_objtxt_id
	}

	query, params, err := squirrel.
		Delete(ObjectTargetObjtxtTableName).
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

func DeleteOneObjectTargetObjtxtByID(ctx context.Context, txn *sql.Tx, id *int) error {
	eq := squirrel.Eq{}
	if id != nil {
		eq["id"] = *id
	}

	query, params, err := squirrel.
		Delete(ObjectTargetObjtxtTableName).
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
