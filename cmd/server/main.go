package main

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"flag"
	"fmt"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/httpclient/detection"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/httpclient/translation"
	"net/http"
	"os"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/repository"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/environment"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/handler"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/internal/handler/httpmiddleware"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/echoutil"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/logger"
)

func main() {
	flag.CommandLine.SetOutput(os.Stdout)
	flag.Parse()

	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "failed to run server. err:%v\n", err)
		os.Exit(1)
	}
}

func run() error {
	env, err := environment.Process()
	if err != nil {
		return err
	}

	e := echo.New()
	e.HideBanner = true

	l := logger.New()

	// db
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=true", env.DBUser, env.DBPass, env.DBHost, env.DBPort, env.DBName))
	if err != nil {
		return err
	}

	// repo
	repo := repository.New(db)

	// httpclient
	dc := detection.NewFake(env.DetectionAddress)
	tc := translation.NewFake(env.TranslationAddress)

	// handler
	server := handler.New(repo, dc, tc)

	// server
	ss, err := base64.StdEncoding.DecodeString(env.SessionSecret)
	if err != nil {
		return err
	}
	sessStore := sessions.NewCookieStore(ss)
	sessStore.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   env.SessionMaxAge,
		Secure:   !env.SessionCookieInsecure,
		HttpOnly: true,
		SameSite: http.SameSiteNoneMode,
	}

	ignorePaths := []string{"/user/signup", "/user/login"}
	e.Use(
		middleware.Recover(),
		middleware.Logger(),
		middleware.RequestID(),
		middleware.CORSWithConfig(middleware.CORSConfig{
			AllowCredentials: true,
		}),
		session.Middleware(sessStore),
		httpmiddleware.SessionMiddleware(db, ignorePaths),
		middleware.BodyDump(func(ec echo.Context, req, res []byte) {
			if ec.Response().Status < 400 {
				return
			}
			var reqj, resj interface{}
			json.Unmarshal(req, &reqj)
			json.Unmarshal(res, &resj)
			l.Infow("",
				"id", echoutil.RequestID(ec),
				"request", reqj,
				"response", resj,
			)
		}),
	)

	api.RegisterHandlers(e, server)
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%v", env.Port)))
	return nil
}
