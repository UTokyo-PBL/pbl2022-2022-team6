// Code generated by "script/dtogen". DO NOT EDIT.
package daocore

import (
    "context"
    "database/sql"
    "strings"
    "time"

    "github.com/Masterminds/squirrel"
    "github.com/nagaseitteam/allocation-app/dao/src/dberror"
)

{{ template "metadata" . }}
{{ template "typedef" . }}
{{ template "query" . }}
{{ template "command" . }}