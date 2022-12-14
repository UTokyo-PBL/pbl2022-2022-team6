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

const UserPreferredLanguageTableName = "user_preferred_languages"

var UserPreferredLanguageAllColumns = []string{
	"id",
	"user_id",
	"language",
	"created_at",
	"updated_at",
}

var UserPreferredLanguageColumnsWOMagics = []string{
	"id",
	"user_id",
	"language",
}

var UserPreferredLanguagePrimaryKeyColumns = []string{
	"id",
}

type UserPreferredLanguage struct {
	ID        int
	UserID    string
	Language  string
	CreatedAt *time.Time
	UpdatedAt *time.Time
}

func (t *UserPreferredLanguage) Values() []interface{} {
	return []interface{}{
		t.ID,
		t.UserID,
		t.Language,
	}
}

func (t *UserPreferredLanguage) SetMap() map[string]interface{} {
	return map[string]interface{}{
		"id":       t.ID,
		"user_id":  t.UserID,
		"language": t.Language,
	}
}

func (t *UserPreferredLanguage) Ptrs() []interface{} {
	return []interface{}{
		&t.ID,
		&t.UserID,
		&t.Language,
		&t.CreatedAt,
		&t.UpdatedAt,
	}
}

func IterateUserPreferredLanguage(sc interface{ Scan(...interface{}) error }) (UserPreferredLanguage, error) {
	t := UserPreferredLanguage{}
	if err := sc.Scan(t.Ptrs()...); err != nil {
		return UserPreferredLanguage{}, dberror.MapError(err)
	}
	return t, nil
}

func SelectAllUserPreferredLanguage(ctx context.Context, txn *sql.Tx) ([]*UserPreferredLanguage, error) {
	query, params, err := squirrel.
		Select(UserPreferredLanguageAllColumns...).
		From(UserPreferredLanguageTableName).
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
	res := make([]*UserPreferredLanguage, 0)
	for rows.Next() {
		t, err := IterateUserPreferredLanguage(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func SelectOneUserPreferredLanguageByUserIDAndLanguage(ctx context.Context, txn *sql.Tx, user_id *string, language *string) (UserPreferredLanguage, error) {
	eq := squirrel.Eq{}
	if user_id != nil {
		eq["user_id"] = *user_id
	}
	if language != nil {
		eq["language"] = *language
	}
	query, params, err := squirrel.
		Select(UserPreferredLanguageAllColumns...).
		From(UserPreferredLanguageTableName).
		Where(eq).
		ToSql()
	if err != nil {
		return UserPreferredLanguage{}, dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return UserPreferredLanguage{}, dberror.MapError(err)
	}
	return IterateUserPreferredLanguage(stmt.QueryRowContext(ctx, params...))
}

func SelectUserPreferredLanguageByUserID(ctx context.Context, txn *sql.Tx, user_id *string) ([]*UserPreferredLanguage, error) {
	eq := squirrel.Eq{}
	if user_id != nil {
		eq["user_id"] = *user_id
	}
	query, params, err := squirrel.
		Select(UserPreferredLanguageAllColumns...).
		From(UserPreferredLanguageTableName).
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
	res := make([]*UserPreferredLanguage, 0)
	for rows.Next() {
		t, err := IterateUserPreferredLanguage(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func SelectOneUserPreferredLanguageByID(ctx context.Context, txn *sql.Tx, id *int) (UserPreferredLanguage, error) {
	eq := squirrel.Eq{}
	if id != nil {
		eq["id"] = *id
	}
	query, params, err := squirrel.
		Select(UserPreferredLanguageAllColumns...).
		From(UserPreferredLanguageTableName).
		Where(eq).
		ToSql()
	if err != nil {
		return UserPreferredLanguage{}, dberror.MapError(err)
	}
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return UserPreferredLanguage{}, dberror.MapError(err)
	}
	return IterateUserPreferredLanguage(stmt.QueryRowContext(ctx, params...))
}

func SelectUserPreferredLanguagesByIDs(ctx context.Context, txn *sql.Tx, ids []int) ([]*UserPreferredLanguage, error) {
	query, params, err := squirrel.
		Select(UserPreferredLanguageAllColumns...).
		From(UserPreferredLanguageTableName).
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
	res := make([]*UserPreferredLanguage, 0)
	for rows.Next() {
		t, err := IterateUserPreferredLanguage(rows)
		if err != nil {
			return nil, dberror.MapError(err)
		}
		res = append(res, &t)
	}
	return res, nil
}

func InsertUserPreferredLanguage(ctx context.Context, txn *sql.Tx, records []*UserPreferredLanguage) error {
	for i := range records {
		if records[i] == nil {
			records = append(records[:i], records[i+1:]...)
		}
	}
	if len(records) == 0 {
		return nil
	}
	sq := squirrel.Insert(UserPreferredLanguageTableName).Columns(UserPreferredLanguageColumnsWOMagics...)
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

func UpdateUserPreferredLanguage(ctx context.Context, txn *sql.Tx, record UserPreferredLanguage) error {
	sql, params, err := squirrel.Update(UserPreferredLanguageTableName).SetMap(record.SetMap()).
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

func UpsertUserPreferredLanguage(ctx context.Context, txn *sql.Tx, record UserPreferredLanguage) error {
	updateSQL, params, err := squirrel.Update(UserPreferredLanguageTableName).SetMap(record.SetMap()).ToSql()
	if err != nil {
		return err
	}
	updateSQL = strings.TrimPrefix(updateSQL, "UPDATE "+UserPreferredLanguageTableName+" SET ")
	query, params, err := squirrel.Insert(UserPreferredLanguageTableName).Columns(UserPreferredLanguageColumnsWOMagics...).Values(record.Values()...).SuffixExpr(squirrel.Expr("ON DUPLICATE KEY UPDATE "+updateSQL, params...)).ToSql()
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

func TruncateUserPreferredLanguage(ctx context.Context, txn *sql.Tx) error {
	query := "TRUNCATE TABLE " + UserPreferredLanguageTableName
	stmt, err := txn.PrepareContext(ctx, query)
	if err != nil {
		return dberror.MapError(err)
	}
	if _, err = stmt.Exec(); err != nil {
		return dberror.MapError(err)
	}
	return nil
}

func DeleteOneUserPreferredLanguageByUserIDAndLanguage(ctx context.Context, txn *sql.Tx, user_id *string, language *string) error {
	eq := squirrel.Eq{}
	if user_id != nil {
		eq["user_id"] = *user_id
	}
	if language != nil {
		eq["language"] = *language
	}

	query, params, err := squirrel.
		Delete(UserPreferredLanguageTableName).
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

func DeleteUserPreferredLanguageByUserID(ctx context.Context, txn *sql.Tx, user_id *string) error {
	eq := squirrel.Eq{}
	if user_id != nil {
		eq["user_id"] = *user_id
	}

	query, params, err := squirrel.
		Delete(UserPreferredLanguageTableName).
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

func DeleteOneUserPreferredLanguageByID(ctx context.Context, txn *sql.Tx, id *int) error {
	eq := squirrel.Eq{}
	if id != nil {
		eq["id"] = *id
	}

	query, params, err := squirrel.
		Delete(UserPreferredLanguageTableName).
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
