package handler

import (
	"fmt"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/failures"

	"github.com/labstack/echo/v4"
	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/echoutil"
)

func handle(ec echo.Context, err error) error {
	switch true {
	case errors.Is(errors.Unwrap(err), failures.InvalidUserParams):
		return echoutil.ErrBadRequest(ec, err)
	case errors.Is(errors.Unwrap(err), failures.UserAlreadyExists):
		return echoutil.ResourceConflict(ec, err)
	case errors.Is(errors.Unwrap(err), failures.UserNotExists):
		return echoutil.ErrBadPassword(ec, err)
	case errors.Is(errors.Unwrap(err), failures.InvalidPassword):
		return echoutil.ErrBadPassword(ec, err)
	case errors.Is(errors.Unwrap(err), failures.UnknownError):
		return echoutil.ErrInternal(ec, err)
	case errors.Is(errors.Unwrap(err), failures.InvalidObjectParams):
		return echoutil.ErrBadRequest(ec, err)
	case errors.Is(errors.Unwrap(err), failures.DetectionFailed):
		return echoutil.ErrInternal(ec, err)
	case errors.Is(errors.Unwrap(err), failures.TranslationFailed):
		return echoutil.ErrInternal(ec, err)
	default:
		fmt.Errorf("unknown error type: %w", err)
		return echoutil.ErrInternal(ec, err)
	}
}
