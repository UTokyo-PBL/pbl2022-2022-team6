package handler

import (
	"context"
	"net/http"

	"github.com/pkg/errors"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/failures"

	"github.com/labstack/echo/v4"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/handler/httpmiddleware"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/service"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/echoutil"
)

func (s *Server) PostUserLogin(ec echo.Context) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	req := &api.User{}
	if err := ec.Bind(&req); err != nil {
		return echoutil.ErrBadRequest(ec, err)
	}

	msg, id, err := service.Login(ctx, s.repo, req)
	if err != nil {
		switch true {
		case errors.Is(failures.InvalidUserParams, errors.Unwrap(err)):
			return echoutil.ErrBadRequest(ec, err)
		case errors.Is(failures.UserNotExists, errors.Unwrap(err)):
			return echoutil.ErrBadPassword(ec, err)
		case errors.Is(failures.InvalidPassword, errors.Unwrap(err)):
			return echoutil.ErrBadPassword(ec, err)
		default:
			return echoutil.ErrInternal(ec, err)
		}
	}

	ec, err = httpmiddleware.SetCookie(ec, id)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	return ec.JSON(http.StatusOK, msg)
}
