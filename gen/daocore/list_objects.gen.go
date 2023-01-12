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

const ListObjectTableName = "list_objects"

var ListObjectAllColumns = []string{
	"id",
	"list_id",
	"object_id",
	"created_at",
	"updated_at",
}

var ListObjectColumnsWOMagics = []string{
	"id",
	"list_id",
	"object_id",
}

var ListObjectPrimaryKeyColumns = []string{
	"id",
}

type ListObject struct {
	ID        int
	ListID    string
	ObjectID  string
	CreatedAt *time.Time
	UpdatedAt *time.Time
}

func (t *ListObject) Values() []interface{} {
	return []interface{}{
		t.ID,
		t.ListID,
		t.ObjectID,
	}
}

func (t *ListObject) SetMap() map[string]interface{} {
	return map[string]interface{}{
		"id":        t.ID,
		"list_id":   t.ListID,
		"object_id": t.ObjectID,
	}
}

func (t *ListObject) Ptrs() []interface{} {
	return []interface{}{
		&t.ID,
		&t.ListID,
		&t.ObjectID,
		&t.CreatedAt,
		&t.UpdatedAt,
	}
}

func IterateListObject(sc interface{ Scan(...interface{}) error }) (ListObject, error) {
	t := ListObject{}
	if err := sc.Scan(t.Ptrs()...); err != nil {
		return ListObject{}, dberror.MapError(err)
	}
	return t, nil
}

func SelectAllListObject(ctx context.Context, txn *sql.Tx) ([]*ListObject, error) {
	query, params, err := squirrel.
		Select(ListObjectAllColumns...).
		From(ListObjectTableName).
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
	res := make([]*ListObject, 0)
	for rows.Next() {
		t, err := IterateListObject(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func SelectOneListObjectByListIDAndObjectID(ctx context.Context, txn *sql.Tx, list_id *string, object_id *string) (ListObject, error) {
	eq := squirrel.Eq{}
	if list_id != nil {
		eq["list_id"] = *list_id
	}
	if object_id != nil {
		eq["object_id"] = *object_id
	}
	query, params, err := squirrel.
		Select(ListObjectAllColumns...).
		From(ListObjectTableName).
		Where(eq).
		ToSql()
	if err != nil {
		return ListObject{}, dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return ListObject{}, dberror.MapError(err)
	}
	return IterateListObject(stmt.QueryRowContext(ctx, params...))
}

func SelectListObjectByListID(ctx context.Context, txn *sql.Tx, list_id *string) ([]*ListObject, error) {
	eq := squirrel.Eq{}
	if list_id != nil {
		eq["list_id"] = *list_id
	}
	query, params, err := squirrel.
		Select(ListObjectAllColumns...).
		From(ListObjectTableName).
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
	res := make([]*ListObject, 0)
	for rows.Next() {
		t, err := IterateListObject(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func SelectListObjectByObjectID(ctx context.Context, txn *sql.Tx, object_id *string) ([]*ListObject, error) {
	eq := squirrel.Eq{}
	if object_id != nil {
		eq["object_id"] = *object_id
	}
	query, params, err := squirrel.
		Select(ListObjectAllColumns...).
		From(ListObjectTableName).
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
	res := make([]*ListObject, 0)
	for rows.Next() {
		t, err := IterateListObject(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func SelectOneListObjectByID(ctx context.Context, txn *sql.Tx, id *int) (ListObject, error) {
	eq := squirrel.Eq{}
	if id != nil {
		eq["id"] = *id
	}
	query, params, err := squirrel.
		Select(ListObjectAllColumns...).
		From(ListObjectTableName).
		Where(eq).
		ToSql()
	if err != nil {
		return ListObject{}, dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return ListObject{}, dberror.MapError(err)
	}
	return IterateListObject(stmt.QueryRowContext(ctx, params...))
}

func SelectListObjectsByIDs(ctx context.Context, txn *sql.Tx, ids []int) ([]*ListObject, error) {
	query, params, err := squirrel.
		Select(ListObjectAllColumns...).
		From(ListObjectTableName).
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
	res := make([]*ListObject, 0)
	for rows.Next() {
		t, err := IterateListObject(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func InsertListObject(ctx context.Context, txn *sql.Tx, records []*ListObject) error {
	for i := range records {
		if records[i] == nil {
			records = append(records[:i], records[i+1:]...)
		}
	}
	if len(records) == 0 {
		return nil
	}
	sq := squirrel.Insert(ListObjectTableName).Columns(ListObjectColumnsWOMagics...)
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

func UpdateListObject(ctx context.Context, txn *sql.Tx, record ListObject) error {
	sql, params, err := squirrel.Update(ListObjectTableName).SetMap(record.SetMap()).
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

func UpsertListObject(ctx context.Context, txn *sql.Tx, record ListObject) error {
	updateSQL, params, err := squirrel.Update(ListObjectTableName).SetMap(record.SetMap()).ToSql()
	if err != nil {
		return err
	}
	updateSQL = strings.TrimPrefix(updateSQL, "UPDATE "+ListObjectTableName+" SET ")
	query, params, err := squirrel.Insert(ListObjectTableName).Columns(ListObjectColumnsWOMagics...).Values(record.Values()...).SuffixExpr(squirrel.Expr("ON DUPLICATE KEY UPDATE "+updateSQL, params...)).ToSql()
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

func TruncateListObject(ctx context.Context, txn *sql.Tx) error {
	query := "TRUNCATE TABLE " + ListObjectTableName
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return dberror.MapError(err)
	}
	if _, err = stmt.Exec(); err != nil {
		return dberror.MapError(err)
	}
	return nil
}

func DeleteOneListObjectByListIDAndObjectID(ctx context.Context, txn *sql.Tx, list_id *string, object_id *string) error {
	eq := squirrel.Eq{}
	if list_id != nil {
		eq["list_id"] = *list_id
	}
	if object_id != nil {
		eq["object_id"] = *object_id
	}

	query, params, err := squirrel.
		Delete(ListObjectTableName).
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

func DeleteListObjectByListID(ctx context.Context, txn *sql.Tx, list_id *string) error {
	eq := squirrel.Eq{}
	if list_id != nil {
		eq["list_id"] = *list_id
	}

	query, params, err := squirrel.
		Delete(ListObjectTableName).
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

func DeleteListObjectByObjectID(ctx context.Context, txn *sql.Tx, object_id *string) error {
	eq := squirrel.Eq{}
	if object_id != nil {
		eq["object_id"] = *object_id
	}

	query, params, err := squirrel.
		Delete(ListObjectTableName).
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

func DeleteOneListObjectByID(ctx context.Context, txn *sql.Tx, id *int) error {
	eq := squirrel.Eq{}
	if id != nil {
		eq["id"] = *id
	}

	query, params, err := squirrel.
		Delete(ListObjectTableName).
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