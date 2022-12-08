package logger

import "go.uber.org/zap"

type Logger interface {
	Debug(...interface{})
	Info(...interface{})
	Infow(msg string, kv ...interface{})
	Warn(...interface{})
	Error(...interface{})
}

var logger, _ = zap.NewProduction()

func New() Logger {
	return logger.Sugar()
}
