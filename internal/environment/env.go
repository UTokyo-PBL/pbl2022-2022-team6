package environment

import (
	"sync"

	"github.com/kelseyhightower/envconfig"
	"go.uber.org/zap/zapcore"
)

type (
	Environment struct {
		Port int `envconfig:"PORT" default:"8000"`

		DBEngine string `envconfig:"DB_ENGINE" default:"mysql"`
		DBHost   string `envconfig:"DB_HOST" default:"localhost"` // or ip address remotely
		DBPort   int    `envconfig:"DB_PORT" default:"3306"`
		DBUser   string `envconfig:"DB_USER" default:"translango"`
		DBPass   string `envconfig:"DB_PASS" default:"passw0rd"`
		DBName   string `envconfig:"DB_NAME" default:"translango"`

		SessionSecret         string `envconfig:"SESSION_SECRET" default:"dHJhbnNsYW5nbwo="`
		SessionMaxAge         int    `envconfig:"SESSION_MAX_AGE" default:"3600"`
		SessionCookieInsecure bool   `envconfig:"SESSION_COOKIE_INSECURE" default:"true"`

		LogLevel zapcore.Level `envconfig:"LOG_LEVEL" default:"INFO"`

		Environment string `envconfig:"ENVIRONMENT" default:"development"`
	}
)

var (
	env  Environment
	err  error
	once sync.Once
)

func init() {
	_, err := Process()
	if err != nil {
		panic(err)
	}
}

func Process() (Environment, error) {
	once.Do(func() {
		err = envconfig.Process("", &env)
	})
	return env, err
}
