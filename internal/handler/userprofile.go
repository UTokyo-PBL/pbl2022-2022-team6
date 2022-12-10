package handler

import (
	"context"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/handler/httpmiddleware"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/service"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/echoutil"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
)

func (s *Server) GetUserProfile(ec echo.Context, params api.GetUserProfileParams) error {
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

	return ec.JSON(http.StatusOK, user)
}

func (s *Server) PostUserProfile(ec echo.Context, params api.PostUserProfileParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	req := &api.User{}
	if err := ec.Bind(&req); err != nil {
		return echoutil.ErrBadRequest(ec, err)
	}

	msg, err := service.PutProfile(ctx, s.repo, userID, req)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, msg)
}
