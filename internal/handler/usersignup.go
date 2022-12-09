package handler

import (
	"context"
	"errors"
	"net/http"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/failures"

	"github.com/labstack/echo/v4"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/service"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/echoutil"
)

func (s *Server) GetUserSignup(ec echo.Context) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	ls, err := service.Languages(ctx, s.repo)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	return ec.JSON(http.StatusOK, ls)
}

func (s *Server) PostUserSignup(ec echo.Context) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	req := &api.User{}
	if err := ec.Bind(req); err != nil {
		return echoutil.ErrBadRequest(ec, err)
	}

	msg, err := service.Register(ctx, s.repo, req)
	if err != nil {
		switch true {
		case errors.Is(failures.InvalidUserParams, errors.Unwrap(err)):
			return echoutil.ErrBadRequest(ec, err)
		case errors.Is(failures.UserAlreadyExists, errors.Unwrap(err)):
			return echoutil.ResourceConflict(ec, err)
		default:
			return echoutil.ErrInternal(ec, err)
		}
	}

	return ec.JSON(http.StatusOK, msg)
}
