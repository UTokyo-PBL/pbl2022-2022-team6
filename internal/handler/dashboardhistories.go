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

func (s *Server) GetDashboardHistories(ec echo.Context, params api.GetDashboardHistoriesParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	objects, err := service.ListObjects(ctx, s.repo, userID)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, &struct {
		Data  []*api.Object `json:"data"`
		Total int           `json:"total"`
	}{
		Data:  objects,
		Total: len(objects),
	})
}

func (s *Server) PostDashboardHistories(ec echo.Context, params api.PostDashboardHistoriesParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	req := &api.Object{}
	if err := ec.Bind(req); err != nil {
		return echoutil.ErrBadRequest(ec, err)
	}

	var msg *api.Message

	switch params.Type {
	case "object":
		msg, err = service.DetectObject(ctx, s.detection, s.translation, s.repo, userID, req)
	case "text":
		msg, err = service.TranslateObject(ctx, s.translation, s.repo, userID, req)
	default:
		return echoutil.ErrBadPassword(ec, err)
	}

	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, msg)
}

func (s *Server) GetDashboardHistoriesObjectID(ec echo.Context, objectID api.ObjectID, params api.GetDashboardHistoriesObjectIDParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	object, err := service.GetObject(ctx, s.repo, userID, objectID)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, object)
}

func (s *Server) DeleteDashboardHistoriesObjectID(ec echo.Context, objectID api.ObjectID, params api.DeleteDashboardHistoriesObjectIDParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	if err := service.DeleteObject(ctx, s.repo, userID, objectID); err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusNoContent, nil)
}

func (s *Server) PostDashboardHistoriesObjectIDCaption(ec echo.Context, objectID api.ObjectID, params api.PostDashboardHistoriesObjectIDCaptionParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	req := &api.Object{}
	if err := ec.Bind(req); err != nil {
		return echoutil.ErrBadRequest(ec, err)
	}

	msg, err := service.UpdateCaption(ctx, s.repo, userID, objectID, *req.Caption)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, msg)
}

func (s *Server) PostDashboardHistoriesObjectIDLiked(ec echo.Context, objectID api.ObjectID, params api.PostDashboardHistoriesObjectIDLikedParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	req := &api.Object{}
	if err := ec.Bind(req); err != nil {
		return echoutil.ErrBadRequest(ec, err)
	}

	msg, err := service.UpdateLiked(ctx, s.repo, userID, objectID, *req.Liked)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, msg)
}

func (s *Server) PostDashboardHistoriesObjectIDNumFailures(ec echo.Context, objectID api.ObjectID, params api.PostDashboardHistoriesObjectIDNumFailuresParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	req := &api.Object{}
	if err := ec.Bind(req); err != nil {
		return echoutil.ErrBadRequest(ec, err)
	}

	msg, err := service.UpdateNumFailures(ctx, s.repo, userID, objectID, *req.NumFailures)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, msg)
}

func (s *Server) PostDashboardHistoriesObjectIDOriginal(ec echo.Context, objectID api.ObjectID, params api.PostDashboardHistoriesObjectIDOriginalParams) error {
	ctx, cancel := context.WithCancel(ec.Request().Context())
	defer cancel()

	userID, err := httpmiddleware.GetUserFromSession(ec)
	if err != nil {
		return echoutil.ErrInternal(ec, err)
	}

	req := &api.Object{}
	if err := ec.Bind(req); err != nil {
		return echoutil.ErrBadRequest(ec, err)
	}

	msg, err := service.UpdateOriginal(ctx, s.translation, s.repo, userID, objectID, req.Original)
	if err != nil {
		return handle(ec, err)
	}

	return ec.JSON(http.StatusOK, msg)
}
