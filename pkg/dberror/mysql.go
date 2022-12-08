package dberror

import (
	"errors"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

var (
	ErrDuplicateKey = errors.New("ER_DUP_ENTRY")
)

func MapError(err error) error {
	if err == nil {
		return nil
	}
	mysqlErr := new(mysql.MySQLError)
	if !errors.As(err, &mysqlErr) {
		return err
	}
	switch mysqlErr.Number {
	case 1062:
		return fmt.Errorf("%w: %s", ErrDuplicateKey, mysqlErr.Message)
	default:
		return err
	}
}
