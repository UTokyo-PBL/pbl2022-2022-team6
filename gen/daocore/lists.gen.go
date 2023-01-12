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

const ListTableName = "lists"

var ListAllColumns = []string{
	"id",
	"name",
	"user_id",
	"icon_name",
	"created_at",
	"updated_at",
}

var ListColumnsWOMagics = []string{
	"id",
	"name",
	"user_id",
	"icon_name",
}

var ListPrimaryKeyColumns = []string{
	"id",
}

type List struct {
	ID        string
	Name      string
	UserID    string
	IconName  string
	CreatedAt *time.Time
	UpdatedAt *time.Time
}

func (t *List) Values() []interface{} {
	return []interface{}{
		t.ID,
		t.Name,
		t.UserID,
		t.IconName,
	}
}

func (t *List) SetMap() map[string]interface{} {
	return map[string]interface{}{
		"id":        t.ID,
		"name":      t.Name,
		"user_id":   t.UserID,
		"icon_name": t.IconName,
	}
}

func (t *List) Ptrs() []interface{} {
	return []interface{}{
		&t.ID,
		&t.Name,
		&t.UserID,
		&t.IconName,
		&t.CreatedAt,
		&t.UpdatedAt,
	}
}

func IterateList(sc interface{ Scan(...interface{}) error }) (List, error) {
	t := List{}
	if err := sc.Scan(t.Ptrs()...); err != nil {
		return List{}, dberror.MapError(err)
	}
	return t, nil
}

func SelectAllList(ctx context.Context, txn *sql.Tx) ([]*List, error) {
	query, params, err := squirrel.
		Select(ListAllColumns...).
		From(ListTableName).
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
	res := make([]*List, 0)
	for rows.Next() {
		t, err := IterateList(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func SelectOneListByName(ctx context.Context, txn *sql.Tx, name *string) (List, error) {
	eq := squirrel.Eq{}
	if name != nil {
		eq["name"] = *name
	}
	query, params, err := squirrel.
		Select(ListAllColumns...).
		From(ListTableName).
		Where(eq).
		ToSql()
	if err != nil {
		return List{}, dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return List{}, dberror.MapError(err)
	}
	return IterateList(stmt.QueryRowContext(ctx, params...))
}

func SelectListByUserID(ctx context.Context, txn *sql.Tx, user_id *string) ([]*List, error) {
	eq := squirrel.Eq{}
	if user_id != nil {
		eq["user_id"] = *user_id
	}
	query, params, err := squirrel.
		Select(ListAllColumns...).
		From(ListTableName).
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
	res := make([]*List, 0)
	for rows.Next() {
		t, err := IterateList(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func SelectOneListByID(ctx context.Context, txn *sql.Tx, id *string) (List, error) {
	eq := squirrel.Eq{}
	if id != nil {
		eq["id"] = *id
	}
	query, params, err := squirrel.
		Select(ListAllColumns...).
		From(ListTableName).
		Where(eq).
		ToSql()
	if err != nil {
		return List{}, dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return List{}, dberror.MapError(err)
	}
	return IterateList(stmt.QueryRowContext(ctx, params...))
}

func SelectListsByIDs(ctx context.Context, txn *sql.Tx, ids []string) ([]*List, error) {
	query, params, err := squirrel.
		Select(ListAllColumns...).
		From(ListTableName).
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
	res := make([]*List, 0)
	for rows.Next() {
		t, err := IterateList(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func InsertList(ctx context.Context, txn *sql.Tx, records []*List) error {
	for i := range records {
		if records[i] == nil {
			records = append(records[:i], records[i+1:]...)
		}
	}
	if len(records) == 0 {
		return nil
	}
	sq := squirrel.Insert(ListTableName).Columns(ListColumnsWOMagics...)
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

func UpdateList(ctx context.Context, txn *sql.Tx, record List) error {
	sql, params, err := squirrel.Update(ListTableName).SetMap(record.SetMap()).
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

func UpsertList(ctx context.Context, txn *sql.Tx, record List) error {
	updateSQL, params, err := squirrel.Update(ListTableName).SetMap(record.SetMap()).ToSql()
	if err != nil {
		return err
	}
	updateSQL = strings.TrimPrefix(updateSQL, "UPDATE "+ListTableName+" SET ")
	query, params, err := squirrel.Insert(ListTableName).Columns(ListColumnsWOMagics...).Values(record.Values()...).SuffixExpr(squirrel.Expr("ON DUPLICATE KEY UPDATE "+updateSQL, params...)).ToSql()
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

func TruncateList(ctx context.Context, txn *sql.Tx) error {
	query := "TRUNCATE TABLE " + ListTableName
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return dberror.MapError(err)
	}
	if _, err = stmt.Exec(); err != nil {
		return dberror.MapError(err)
	}
	return nil
}

func DeleteOneListByName(ctx context.Context, txn *sql.Tx, name *string) error {
	eq := squirrel.Eq{}
	if name != nil {
		eq["name"] = *name
	}

	query, params, err := squirrel.
		Delete(ListTableName).
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

func DeleteListByUserID(ctx context.Context, txn *sql.Tx, user_id *string) error {
	eq := squirrel.Eq{}
	if user_id != nil {
		eq["user_id"] = *user_id
	}

	query, params, err := squirrel.
		Delete(ListTableName).
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

func DeleteOneListByID(ctx context.Context, txn *sql.Tx, id *string) error {
	eq := squirrel.Eq{}
	if id != nil {
		eq["id"] = *id
	}

	query, params, err := squirrel.
		Delete(ListTableName).
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