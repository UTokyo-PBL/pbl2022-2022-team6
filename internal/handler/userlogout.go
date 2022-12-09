package handler

import (
	"context"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/handler/httpmiddleware"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/service"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/echoutil"
	"github.com/labstack/echo/v4"
	"net/http"
)

func (s *Server) PostUserLogout(ec echo.Context, params api.PostUserLogoutParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	user, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	msg, err := service.Logout(ctx, s.repo, user.ID)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	return ec.JSON(http.StatusOK, msg)
}
