{{- define "command" }}
{{- $table := . -}}
func Insert{{ $table.GoName }}(ctx context.Context, txn *sql.Tx, records []*{{ $table.GoName }}) error {
    for i := range records {
        if records[i] == nil {
            records = append(records[:i], records[i+1:]...)
        }
    }
    if len(records) == 0 {
        return nil
    }
    sq := squirrel.Insert({{ $table.GoName }}TableName).Columns({{ $table.GoName }}ColumnsWOMagics...)
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

func Update{{ $table.GoName }}(ctx context.Context, txn *sql.Tx, record {{ $table.GoName }}) error {
    sql, params, err := squirrel.Update({{ $table.GoName }}TableName).SetMap(record.SetMap()).
        Where(squirrel.Eq{
        {{- range $table.Columns }}
        {{- if .IsPrimary }}
        "{{ .Name }}": record.{{ .GoName }},
        {{- end }}
        {{- end }}
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

func Upsert{{ $table.GoName }}(ctx context.Context, txn *sql.Tx, record {{ $table.GoName }}) error {
    updateSQL, params, err := squirrel.Update({{ $table.GoName }}TableName).SetMap(record.SetMap()).ToSql()
    if err != nil {
        return err
    }
    updateSQL = strings.TrimPrefix(updateSQL, "UPDATE "+{{ $table.GoName }}TableName+" SET ")
    query, params, err := squirrel.Insert({{ $table.GoName }}TableName).Columns({{ $table.GoName }}ColumnsWOMagics...).Values(record.Values()...).SuffixExpr(squirrel.Expr("ON DUPLICATE KEY UPDATE "+updateSQL, params...)).ToSql()
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

func Truncate{{ $table.GoName }}(ctx context.Context, txn *sql.Tx) error {
    query := "TRUNCATE TABLE " + {{ $table.GoName }}TableName
    stmt, err := txn.PrepareContext(ctx, query)
    if err != nil {
    return dberror.MapError(err)
    }
    if _, err = stmt.Exec(); err != nil {
    return dberror.MapError(err)
    }
    return nil
}

{{ range $index := $table.Indexes -}}
func Delete{{ if $index.IsUnique }}One{{ end }}{{ $table.GoName }}By{{ range $i, $f := $index.Fields }} {{- $f.GoName -}} {{- if not ($index.Tail $i) -}} And {{- end }}{{ end }}(ctx context.Context, txn *sql.Tx, {{ range $i, $f := $index.Fields }} {{- $f.Name }} *{{ $f.GoType }} {{- if not ($index.Tail $i) -}} , {{- end }}{{ end }}) error {
    eq := squirrel.Eq{}
    {{- range $index.Fields }}
    if {{ .Name }} != nil {
        eq["{{ .Name }}"] = *{{ .Name }}
    }
    {{- end }}

    query, params, err := squirrel.
        Delete({{ $table.GoName}}TableName).
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

{{ end -}}
{{- end -}}