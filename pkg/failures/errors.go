package failures

import "errors"

var (
	InvalidUserParams   = errors.New("invalid user params")
	UserAlreadyExists   = errors.New("user already exists")
	UserNotExists       = errors.New("user doesn't exist")
	InvalidPassword     = errors.New("invalid password")
	UnknownError        = errors.New("unknown error")
	InvalidObjectParams = errors.New("invalid object params")
	DetectionFailed     = errors.New("detection failed")
	TranslationFailed   = errors.New("translation failed")
	InvalidObjectAccess = errors.New("invalid object access")
	ResourceNotFound    = errors.New("resource not found")
	InvalidListParams   = errors.New("invalid list params")
	InvalidListAccess   = errors.New("invalid object access")
)
