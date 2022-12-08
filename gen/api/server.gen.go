// Package api provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen version v1.11.0 DO NOT EDIT.
package api

import (
	"fmt"
	"net/http"

	"github.com/deepmap/oapi-codegen/pkg/runtime"
	openapi_types "github.com/deepmap/oapi-codegen/pkg/types"
	"github.com/labstack/echo/v4"
)

// Defines values for TypeQuery.
const (
	TypeQueryObject TypeQuery = "object"
	TypeQueryText   TypeQuery = "text"
)

// Coordinate defines model for coordinate.
type Coordinate struct {
	True *float32 `json:"true,omitempty"`
	X    *float32 `json:"x,omitempty"`
}

// List defines model for list.
type List struct {
	IconName *string             `json:"icon_name,omitempty"`
	Id       *openapi_types.UUID `json:"id,omitempty"`
	Name     *string             `json:"name,omitempty"`
	Objects  *[]Object           `json:"objects,omitempty"`
}

// Message defines model for message.
type Message struct {
	Message *string `json:"message,omitempty"`
}

// Object defines model for object.
type Object struct {
	Bbox *struct {
		LowerLeft  *Coordinate `json:"lower_left,omitempty"`
		LowerRight *Coordinate `json:"lower_right,omitempty"`
		UpperLeft  *Coordinate `json:"upper_left,omitempty"`
		UpperRight *Coordinate `json:"upper_right,omitempty"`
	} `json:"bbox,omitempty"`
	Caption     *string             `json:"caption,omitempty"`
	City        *string             `json:"city,omitempty"`
	Country     *string             `json:"country,omitempty"`
	Id          *openapi_types.UUID `json:"id,omitempty"`
	ImageUrl    *string             `json:"image_url,omitempty"`
	Latitude    *float32            `json:"latitude,omitempty"`
	Liked       *bool               `json:"liked,omitempty"`
	Longitude   *float32            `json:"longitude,omitempty"`
	NumFailures *int                `json:"num_failures,omitempty"`
	Original    *struct {
		Language *string `json:"language,omitempty"`
		SoundUrl *string `json:"sound_url,omitempty"`
		Text     *string `json:"text,omitempty"`
	} `json:"original,omitempty"`
	Target *[]struct {
		Language *string `json:"language,omitempty"`
		SoundUrl *string `json:"sound_url,omitempty"`
		Text     *string `json:"text,omitempty"`
	} `json:"target,omitempty"`
}

// User defines model for user.
type User struct {
	Email      *string `json:"email,omitempty"`
	FirstName  *string `json:"first_name,omitempty"`
	Language   *string `json:"language,omitempty"`
	LastName   *string `json:"last_name,omitempty"`
	MiddleName *string `json:"middle_name,omitempty"`

	// null in response
	Password           *string   `json:"password,omitempty"`
	PreferredLanguages *[]string `json:"preferred_languages,omitempty"`
	Username           *string   `json:"username,omitempty"`
}

// Cookie defines model for cookie.
type Cookie = openapi_types.UUID

// ListID defines model for listID.
type ListID = string

// ObjectID defines model for objectID.
type ObjectID = string

// SearchQuery defines model for search-query.
type SearchQuery = string

// TypeQuery defines model for type-query.
type TypeQuery string

// Languages defines model for languages.
type Languages struct {
	Languages *[]string `json:"languages,omitempty"`
}

// Lists defines model for lists.
type Lists struct {
	CustomLists *[]List `json:"custom_lists,omitempty"`
	DefaultList *List   `json:"default_list,omitempty"`
	Total       *int    `json:"total,omitempty"`
}

// Objects defines model for objects.
type Objects struct {
	Data  *[]Object `json:"data,omitempty"`
	Total *int      `json:"total,omitempty"`
}

// ResourceNotFound defines model for resource-not-found.
type ResourceNotFound = Message

// Caption defines model for caption.
type Caption struct {
	Caption *string `json:"caption,omitempty"`
}

// Liked defines model for liked.
type Liked struct {
	Id    *string `json:"id,omitempty"`
	Liked *bool   `json:"liked,omitempty"`
}

// NumFailures defines model for num-failures.
type NumFailures struct {
	NumFailures *int `json:"num_failures,omitempty"`
}

// Original defines model for original.
type Original struct {
	Original *struct {
		Language *string `json:"language,omitempty"`
		Text     *string `json:"text,omitempty"`
	} `json:"original,omitempty"`
}

// PreferredLanguages defines model for preferred_languages.
type PreferredLanguages struct {
	Languages *[]string `json:"languages,omitempty"`
}

// GetDashboardHistoriesParams defines parameters for GetDashboardHistories.
type GetDashboardHistoriesParams struct {
	// search on your translated words
	Key *SearchQuery `form:"key,omitempty" json:"key,omitempty"`

	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// PostDashboardHistoriesParams defines parameters for PostDashboardHistories.
type PostDashboardHistoriesParams struct {
	Type PostDashboardHistoriesParamsType `form:"type" json:"type"`

	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// PostDashboardHistoriesParamsType defines parameters for PostDashboardHistories.
type PostDashboardHistoriesParamsType string

// GetDashboardHistoriesObjectIDParams defines parameters for GetDashboardHistoriesObjectID.
type GetDashboardHistoriesObjectIDParams struct {
	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// PostDashboardHistoriesObjectIDCaptionParams defines parameters for PostDashboardHistoriesObjectIDCaption.
type PostDashboardHistoriesObjectIDCaptionParams struct {
	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// PostDashboardHistoriesObjectIDLikedParams defines parameters for PostDashboardHistoriesObjectIDLiked.
type PostDashboardHistoriesObjectIDLikedParams struct {
	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// PostDashboardHistoriesObjectIDNumFailuresParams defines parameters for PostDashboardHistoriesObjectIDNumFailures.
type PostDashboardHistoriesObjectIDNumFailuresParams struct {
	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// PostDashboardHistoriesObjectIDOriginalParams defines parameters for PostDashboardHistoriesObjectIDOriginal.
type PostDashboardHistoriesObjectIDOriginalParams struct {
	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// GetDashboardListsParams defines parameters for GetDashboardLists.
type GetDashboardListsParams struct {
	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// PostDashboardListsParams defines parameters for PostDashboardLists.
type PostDashboardListsParams struct {
	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// GetDashboardTopParams defines parameters for GetDashboardTop.
type GetDashboardTopParams struct {
	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// PostDashboardTopParams defines parameters for PostDashboardTop.
type PostDashboardTopParams struct {
	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// DeleteDashboardsListsListIDParams defines parameters for DeleteDashboardsListsListID.
type DeleteDashboardsListsListIDParams struct {
	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// GetDashboardsListsListIDParams defines parameters for GetDashboardsListsListID.
type GetDashboardsListsListIDParams struct {
	NumQuestions int `form:"num_questions" json:"num_questions"`

	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// PutDashboardsListsListIDParams defines parameters for PutDashboardsListsListID.
type PutDashboardsListsListIDParams struct {
	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// PostUserLoginJSONBody defines parameters for PostUserLogin.
type PostUserLoginJSONBody struct {
	Email    *string `json:"email,omitempty"`
	Password *string `json:"password,omitempty"`
}

// GetUserProfileParams defines parameters for GetUserProfile.
type GetUserProfileParams struct {
	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// PostUserProfileParams defines parameters for PostUserProfile.
type PostUserProfileParams struct {
	// cookie for identifying user
	Cookie Cookie `json:"cookie"`
}

// PostDashboardHistoriesJSONRequestBody defines body for PostDashboardHistories for application/json ContentType.
type PostDashboardHistoriesJSONRequestBody Object

// PostDashboardHistoriesObjectIDCaptionJSONRequestBody defines body for PostDashboardHistoriesObjectIDCaption for application/json ContentType.
type PostDashboardHistoriesObjectIDCaptionJSONRequestBody Caption

// PostDashboardHistoriesObjectIDLikedJSONRequestBody defines body for PostDashboardHistoriesObjectIDLiked for application/json ContentType.
type PostDashboardHistoriesObjectIDLikedJSONRequestBody Liked

// PostDashboardHistoriesObjectIDNumFailuresJSONRequestBody defines body for PostDashboardHistoriesObjectIDNumFailures for application/json ContentType.
type PostDashboardHistoriesObjectIDNumFailuresJSONRequestBody NumFailures

// PostDashboardHistoriesObjectIDOriginalJSONRequestBody defines body for PostDashboardHistoriesObjectIDOriginal for application/json ContentType.
type PostDashboardHistoriesObjectIDOriginalJSONRequestBody Original

// PostDashboardListsJSONRequestBody defines body for PostDashboardLists for application/json ContentType.
type PostDashboardListsJSONRequestBody = List

// PostDashboardTopJSONRequestBody defines body for PostDashboardTop for application/json ContentType.
type PostDashboardTopJSONRequestBody PreferredLanguages

// PutDashboardsListsListIDJSONRequestBody defines body for PutDashboardsListsListID for application/json ContentType.
type PutDashboardsListsListIDJSONRequestBody = List

// PostUserLoginJSONRequestBody defines body for PostUserLogin for application/json ContentType.
type PostUserLoginJSONRequestBody PostUserLoginJSONBody

// PostUserProfileJSONRequestBody defines body for PostUserProfile for application/json ContentType.
type PostUserProfileJSONRequestBody = User

// PostUserSignupJSONRequestBody defines body for PostUserSignup for application/json ContentType.
type PostUserSignupJSONRequestBody = User

// ServerInterface represents all server handlers.
type ServerInterface interface {
	// dashboard/histories - list histories
	// (GET /dashboard/histories)
	GetDashboardHistories(ctx echo.Context, params GetDashboardHistoriesParams) error
	// dashboard/camera - add history (detect object or text)
	// (POST /dashboard/histories)
	PostDashboardHistories(ctx echo.Context, params PostDashboardHistoriesParams) error
	// dashboard/history - history
	// (GET /dashboard/histories/{objectID})
	GetDashboardHistoriesObjectID(ctx echo.Context, objectID ObjectID, params GetDashboardHistoriesObjectIDParams) error
	// dashboard/histories - edit caption
	// (POST /dashboard/histories/{objectID}/caption)
	PostDashboardHistoriesObjectIDCaption(ctx echo.Context, objectID ObjectID, params PostDashboardHistoriesObjectIDCaptionParams) error
	// dashboard/history - edit liked
	// (POST /dashboard/histories/{objectID}/liked)
	PostDashboardHistoriesObjectIDLiked(ctx echo.Context, objectID ObjectID, params PostDashboardHistoriesObjectIDLikedParams) error
	// dashboard/histories - edit num failures
	// (POST /dashboard/histories/{objectID}/num_failures)
	PostDashboardHistoriesObjectIDNumFailures(ctx echo.Context, objectID ObjectID, params PostDashboardHistoriesObjectIDNumFailuresParams) error
	// dashboard/histories - edit original language
	// (POST /dashboard/histories/{objectID}/original)
	PostDashboardHistoriesObjectIDOriginal(ctx echo.Context, objectID ObjectID, params PostDashboardHistoriesObjectIDOriginalParams) error
	// dashboard/list - lists
	// (GET /dashboard/lists)
	GetDashboardLists(ctx echo.Context, params GetDashboardListsParams) error
	// dashboard/list - add custom list
	// (POST /dashboard/lists)
	PostDashboardLists(ctx echo.Context, params PostDashboardListsParams) error
	// dashboard/main - top
	// (GET /dashboard/top)
	GetDashboardTop(ctx echo.Context, params GetDashboardTopParams) error
	// dashboard/main - update preferred language
	// (POST /dashboard/top)
	PostDashboardTop(ctx echo.Context, params PostDashboardTopParams) error
	// dashboard - delete list
	// (DELETE /dashboards/lists/{listID})
	DeleteDashboardsListsListID(ctx echo.Context, listID ListID, params DeleteDashboardsListsListIDParams) error
	// dashboard/list - start game
	// (GET /dashboards/lists/{listID})
	GetDashboardsListsListID(ctx echo.Context, listID ListID, params GetDashboardsListsListIDParams) error
	// dashboard - edit list
	// (PUT /dashboards/lists/{listID})
	PutDashboardsListsListID(ctx echo.Context, listID ListID, params PutDashboardsListsListIDParams) error
	// login
	// (POST /user/login)
	PostUserLogin(ctx echo.Context) error
	// user profile
	// (GET /user/profile)
	GetUserProfile(ctx echo.Context, params GetUserProfileParams) error
	// edit user profile
	// (POST /user/profile)
	PostUserProfile(ctx echo.Context, params PostUserProfileParams) error
	// signup page
	// (GET /user/signup)
	GetUserSignup(ctx echo.Context) error
	// signup - register user
	// (POST /user/signup)
	PostUserSignup(ctx echo.Context) error
}

// ServerInterfaceWrapper converts echo contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler ServerInterface
}

// GetDashboardHistories converts echo context to params.
func (w *ServerInterfaceWrapper) GetDashboardHistories(ctx echo.Context) error {
	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params GetDashboardHistoriesParams
	// ------------- Optional query parameter "key" -------------

	err = runtime.BindQueryParameter("form", true, false, "key", ctx.QueryParams(), &params.Key)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter key: %s", err))
	}

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GetDashboardHistories(ctx, params)
	return err
}

// PostDashboardHistories converts echo context to params.
func (w *ServerInterfaceWrapper) PostDashboardHistories(ctx echo.Context) error {
	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params PostDashboardHistoriesParams
	// ------------- Required query parameter "type" -------------

	err = runtime.BindQueryParameter("form", true, true, "type", ctx.QueryParams(), &params.Type)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter type: %s", err))
	}

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PostDashboardHistories(ctx, params)
	return err
}

// GetDashboardHistoriesObjectID converts echo context to params.
func (w *ServerInterfaceWrapper) GetDashboardHistoriesObjectID(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "objectID" -------------
	var objectID ObjectID

	err = runtime.BindStyledParameterWithLocation("simple", false, "objectID", runtime.ParamLocationPath, ctx.Param("objectID"), &objectID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter objectID: %s", err))
	}

	// Parameter object where we will unmarshal all parameters from the context
	var params GetDashboardHistoriesObjectIDParams

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GetDashboardHistoriesObjectID(ctx, objectID, params)
	return err
}

// PostDashboardHistoriesObjectIDCaption converts echo context to params.
func (w *ServerInterfaceWrapper) PostDashboardHistoriesObjectIDCaption(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "objectID" -------------
	var objectID ObjectID

	err = runtime.BindStyledParameterWithLocation("simple", false, "objectID", runtime.ParamLocationPath, ctx.Param("objectID"), &objectID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter objectID: %s", err))
	}

	// Parameter object where we will unmarshal all parameters from the context
	var params PostDashboardHistoriesObjectIDCaptionParams

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PostDashboardHistoriesObjectIDCaption(ctx, objectID, params)
	return err
}

// PostDashboardHistoriesObjectIDLiked converts echo context to params.
func (w *ServerInterfaceWrapper) PostDashboardHistoriesObjectIDLiked(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "objectID" -------------
	var objectID ObjectID

	err = runtime.BindStyledParameterWithLocation("simple", false, "objectID", runtime.ParamLocationPath, ctx.Param("objectID"), &objectID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter objectID: %s", err))
	}

	// Parameter object where we will unmarshal all parameters from the context
	var params PostDashboardHistoriesObjectIDLikedParams

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PostDashboardHistoriesObjectIDLiked(ctx, objectID, params)
	return err
}

// PostDashboardHistoriesObjectIDNumFailures converts echo context to params.
func (w *ServerInterfaceWrapper) PostDashboardHistoriesObjectIDNumFailures(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "objectID" -------------
	var objectID ObjectID

	err = runtime.BindStyledParameterWithLocation("simple", false, "objectID", runtime.ParamLocationPath, ctx.Param("objectID"), &objectID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter objectID: %s", err))
	}

	// Parameter object where we will unmarshal all parameters from the context
	var params PostDashboardHistoriesObjectIDNumFailuresParams

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PostDashboardHistoriesObjectIDNumFailures(ctx, objectID, params)
	return err
}

// PostDashboardHistoriesObjectIDOriginal converts echo context to params.
func (w *ServerInterfaceWrapper) PostDashboardHistoriesObjectIDOriginal(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "objectID" -------------
	var objectID ObjectID

	err = runtime.BindStyledParameterWithLocation("simple", false, "objectID", runtime.ParamLocationPath, ctx.Param("objectID"), &objectID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter objectID: %s", err))
	}

	// Parameter object where we will unmarshal all parameters from the context
	var params PostDashboardHistoriesObjectIDOriginalParams

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PostDashboardHistoriesObjectIDOriginal(ctx, objectID, params)
	return err
}

// GetDashboardLists converts echo context to params.
func (w *ServerInterfaceWrapper) GetDashboardLists(ctx echo.Context) error {
	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params GetDashboardListsParams

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GetDashboardLists(ctx, params)
	return err
}

// PostDashboardLists converts echo context to params.
func (w *ServerInterfaceWrapper) PostDashboardLists(ctx echo.Context) error {
	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params PostDashboardListsParams

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PostDashboardLists(ctx, params)
	return err
}

// GetDashboardTop converts echo context to params.
func (w *ServerInterfaceWrapper) GetDashboardTop(ctx echo.Context) error {
	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params GetDashboardTopParams

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GetDashboardTop(ctx, params)
	return err
}

// PostDashboardTop converts echo context to params.
func (w *ServerInterfaceWrapper) PostDashboardTop(ctx echo.Context) error {
	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params PostDashboardTopParams

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PostDashboardTop(ctx, params)
	return err
}

// DeleteDashboardsListsListID converts echo context to params.
func (w *ServerInterfaceWrapper) DeleteDashboardsListsListID(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "listID" -------------
	var listID ListID

	err = runtime.BindStyledParameterWithLocation("simple", false, "listID", runtime.ParamLocationPath, ctx.Param("listID"), &listID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter listID: %s", err))
	}

	// Parameter object where we will unmarshal all parameters from the context
	var params DeleteDashboardsListsListIDParams

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.DeleteDashboardsListsListID(ctx, listID, params)
	return err
}

// GetDashboardsListsListID converts echo context to params.
func (w *ServerInterfaceWrapper) GetDashboardsListsListID(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "listID" -------------
	var listID ListID

	err = runtime.BindStyledParameterWithLocation("simple", false, "listID", runtime.ParamLocationPath, ctx.Param("listID"), &listID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter listID: %s", err))
	}

	// Parameter object where we will unmarshal all parameters from the context
	var params GetDashboardsListsListIDParams
	// ------------- Required query parameter "num_questions" -------------

	err = runtime.BindQueryParameter("form", true, true, "num_questions", ctx.QueryParams(), &params.NumQuestions)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter num_questions: %s", err))
	}

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GetDashboardsListsListID(ctx, listID, params)
	return err
}

// PutDashboardsListsListID converts echo context to params.
func (w *ServerInterfaceWrapper) PutDashboardsListsListID(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "listID" -------------
	var listID ListID

	err = runtime.BindStyledParameterWithLocation("simple", false, "listID", runtime.ParamLocationPath, ctx.Param("listID"), &listID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter listID: %s", err))
	}

	// Parameter object where we will unmarshal all parameters from the context
	var params PutDashboardsListsListIDParams

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PutDashboardsListsListID(ctx, listID, params)
	return err
}

// PostUserLogin converts echo context to params.
func (w *ServerInterfaceWrapper) PostUserLogin(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PostUserLogin(ctx)
	return err
}

// GetUserProfile converts echo context to params.
func (w *ServerInterfaceWrapper) GetUserProfile(ctx echo.Context) error {
	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params GetUserProfileParams

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GetUserProfile(ctx, params)
	return err
}

// PostUserProfile converts echo context to params.
func (w *ServerInterfaceWrapper) PostUserProfile(ctx echo.Context) error {
	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params PostUserProfileParams

	headers := ctx.Request().Header
	// ------------- Required header parameter "cookie" -------------
	if valueList, found := headers[http.CanonicalHeaderKey("cookie")]; found {
		var Cookie Cookie
		n := len(valueList)
		if n != 1 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Expected one value for cookie, got %d", n))
		}

		err = runtime.BindStyledParameterWithLocation("simple", false, "cookie", runtime.ParamLocationHeader, valueList[0], &Cookie)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter cookie: %s", err))
		}

		params.Cookie = Cookie
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Header parameter cookie is required, but not found"))
	}

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PostUserProfile(ctx, params)
	return err
}

// GetUserSignup converts echo context to params.
func (w *ServerInterfaceWrapper) GetUserSignup(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GetUserSignup(ctx)
	return err
}

// PostUserSignup converts echo context to params.
func (w *ServerInterfaceWrapper) PostUserSignup(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PostUserSignup(ctx)
	return err
}

// This is a simple interface which specifies echo.Route addition functions which
// are present on both echo.Echo and echo.Group, since we want to allow using
// either of them for path registration
type EchoRouter interface {
	CONNECT(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	DELETE(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	GET(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	HEAD(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	OPTIONS(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	PATCH(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	POST(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	PUT(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	TRACE(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
}

// RegisterHandlers adds each server route to the EchoRouter.
func RegisterHandlers(router EchoRouter, si ServerInterface) {
	RegisterHandlersWithBaseURL(router, si, "")
}

// Registers handlers, and prepends BaseURL to the paths, so that the paths
// can be served under a prefix.
func RegisterHandlersWithBaseURL(router EchoRouter, si ServerInterface, baseURL string) {

	wrapper := ServerInterfaceWrapper{
		Handler: si,
	}

	router.GET(baseURL+"/dashboard/histories", wrapper.GetDashboardHistories)
	router.POST(baseURL+"/dashboard/histories", wrapper.PostDashboardHistories)
	router.GET(baseURL+"/dashboard/histories/:objectID", wrapper.GetDashboardHistoriesObjectID)
	router.POST(baseURL+"/dashboard/histories/:objectID/caption", wrapper.PostDashboardHistoriesObjectIDCaption)
	router.POST(baseURL+"/dashboard/histories/:objectID/liked", wrapper.PostDashboardHistoriesObjectIDLiked)
	router.POST(baseURL+"/dashboard/histories/:objectID/num_failures", wrapper.PostDashboardHistoriesObjectIDNumFailures)
	router.POST(baseURL+"/dashboard/histories/:objectID/original", wrapper.PostDashboardHistoriesObjectIDOriginal)
	router.GET(baseURL+"/dashboard/lists", wrapper.GetDashboardLists)
	router.POST(baseURL+"/dashboard/lists", wrapper.PostDashboardLists)
	router.GET(baseURL+"/dashboard/top", wrapper.GetDashboardTop)
	router.POST(baseURL+"/dashboard/top", wrapper.PostDashboardTop)
	router.DELETE(baseURL+"/dashboards/lists/:listID", wrapper.DeleteDashboardsListsListID)
	router.GET(baseURL+"/dashboards/lists/:listID", wrapper.GetDashboardsListsListID)
	router.PUT(baseURL+"/dashboards/lists/:listID", wrapper.PutDashboardsListsListID)
	router.POST(baseURL+"/user/login", wrapper.PostUserLogin)
	router.GET(baseURL+"/user/profile", wrapper.GetUserProfile)
	router.POST(baseURL+"/user/profile", wrapper.PostUserProfile)
	router.GET(baseURL+"/user/signup", wrapper.GetUserSignup)
	router.POST(baseURL+"/user/signup", wrapper.PostUserSignup)

}