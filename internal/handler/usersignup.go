package handler

import (
	"context"
	"net/http"

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
		return handle(ec, err)
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
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, msg)
}
