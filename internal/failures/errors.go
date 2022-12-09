package failures

import "errors"

var (
	InvalidUserParams = errors.New("invalid user params")
	UserAlreadyExists = errors.New("user already exists")
	UserNotExists     = errors.New("user doesn't exist")
	InvalidPassword   = errors.New("invalid password")
	UnknownError      = errors.New("unknown error")
)
