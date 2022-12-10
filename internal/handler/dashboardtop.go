package handler

import (
	"context"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/handler/httpmiddleware"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/service"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/echoutil"
)

func (s *Server) GetDashboardTop(ec echo.Context, params api.GetDashboardTopParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	user, err := service.GetProfile(ctx, s.repo, userID)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, user.PreferredLanguages)
}

func (s *Server) PostDashboardTop(ec echo.Context, params api.PostDashboardTopParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	req := &api.PreferredLanguages{}
	if err := ec.Bind(req); err != nil {
		return echoutil.ErrBadRequest(ec, err)
	}

	msg, err := service.PutPreferredLanguages(ctx, s.repo, userID, req)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, msg)
}
