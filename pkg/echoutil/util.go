package echoutil

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func RequestID(ec echo.Context) string {
	h := ec.Response().Header()[echo.HeaderXRequestID]
	if len(h) == 0 {
		return ""
	}
	return h[0]
}

type errOption struct {
	msg map[string]interface{}
}

type ErrOptionFunc func(option *errOption)

func ErrInternal(ec echo.Context, err error, opts ...ErrOptionFunc) error {
	opt := errOption{}
	for _, f := range opts {
		f(&opt)
	}
	return ec.JSON(http.StatusInternalServerError, map[string]interface{}{
		"error":        "internal server error",
		"error_detail": err.Error(),
		"msg":          opt.msg,
	})
}

func ErrBadRequest(ec echo.Context, err error, opts ...ErrOptionFunc) error {
	opt := errOption{}
	for _, f := range opts {
		f(&opt)
	}
	return ec.JSON(http.StatusBadRequest, map[string]interface{}{
		"error":        "invalid request",
		"error_detail": err.Error(),
		"msg":          opt.msg,
	})
}

func ErrBadPassword(ec echo.Context, err error, opts ...ErrOptionFunc) error {
	opt := errOption{}
	for _, f := range opts {
		f(&opt)
	}
	return ec.JSON(http.StatusUnauthorized, map[string]interface{}{
		"error":        "invalid user info",
		"error_detail": err.Error(),
		"msg":          opt.msg,
	})
}
