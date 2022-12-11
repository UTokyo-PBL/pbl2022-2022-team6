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

func (s *Server) GetDashboardLists(ec echo.Context, params api.GetDashboardListsParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	lists, err := service.ListLists(ctx, s.repo, userID)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, lists)
}

func (s *Server) PostDashboardLists(ec echo.Context, params api.PostDashboardListsParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	req := &api.List{}
	if err := ec.Bind(req); err != nil {
		return echoutil.ErrBadRequest(ec, err)
	}

	msg, err := service.PostList(ctx, s.repo, userID, req)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, msg)
}

func (s *Server) DeleteDashboardsListsListID(ec echo.Context, listID api.ListID, params api.DeleteDashboardsListsListIDParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	msg, err := service.DeleteList(ctx, s.repo, userID, listID)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, msg)
}

func (s *Server) GetDashboardsListsListID(ec echo.Context, listID api.ListID, params api.GetDashboardsListsListIDParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	list, err := service.GetList(ctx, s.repo, userID, listID)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, list)
}

func (s *Server) PutDashboardsListsListID(ec echo.Context, listID api.ListID, params api.PutDashboardsListsListIDParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	req := &api.List{}
	if err := ec.Bind(req); err != nil {
		return echoutil.ErrBadRequest(ec, err)
	}

	msg, err := service.UpdateList(ctx, s.repo, userID, listID, req)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, msg)
}
