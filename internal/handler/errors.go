package handler

import (
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/failures"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/echoutil"
)

func handle(ec echo.Context, err error) error {
	switch true {
	case errors.Is(failures.InvalidUserParams, errors.Unwrap(err)):
		return echoutil.ErrBadRequest(ec, err)
	case errors.Is(failures.UserAlreadyExists, errors.Unwrap(err)):
		return echoutil.ResourceConflict(ec, err)
	case errors.Is(failures.UserNotExists, errors.Unwrap(err)):
		return echoutil.ErrBadPassword(ec, err)
	case errors.Is(failures.InvalidPassword, errors.Unwrap(err)):
		return echoutil.ErrBadPassword(ec, err)
	case errors.Is(failures.UnknownError, errors.Unwrap(err)):
		return echoutil.ErrInternal(ec, err)
	default:
		fmt.Errorf("unknown error type: %w", err)
		return echoutil.ErrInternal(ec, err)
	}
}
