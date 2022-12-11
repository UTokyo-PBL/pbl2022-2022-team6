package model

import (
	"errors"
	"fmt"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/daocore"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/types"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
)

type Objtxt struct {
	ID       string
	Text     string
	Language string
	SoundURL string
}

type BBox struct {
	X float32
	Y float32
	W float32
	H float32
}

type Object struct {
	ID          string
	UserID      string
	Original    *Objtxt
	Target      []*Objtxt
	BBox        *BBox
	ImageURL    string
	Caption     string
	Country     string
	City        string
	Latitude    float32
	Longitude   float32
	Liked       bool
	NumFailures int
}

func ObjectFromAPI(userID string, h *api.Object) (*Object, error) {
	o := new(Object)

	if h == nil {
		return nil, errors.New("object have not been parsed")
	}

	o.UserID = userID

	if h.Id == nil || *h.Id == "" {
		return nil, errors.New("id cannot be null")
	}
	o.ID = *h.Id

	if h.ImageUrl == nil {
		o.ImageURL = ""
	} else {
		o.ImageURL = *h.ImageUrl
	}

	if h.Caption == nil {
		o.Caption = ""
	} else {
		o.Caption = *h.Caption
	}

	if h.Country == nil {
		o.Country = ""
	} else {
		o.Country = *h.Country
	}

	if h.City == nil {
		o.City = ""
	} else {
		o.City = *h.City
	}

	if h.Latitude == nil {
		o.Latitude = -1
	} else {
		o.Latitude = *h.Latitude
	}

	if h.Longitude == nil {
		o.Longitude = -1
	} else {
		o.Longitude = *h.Longitude
	}

	if h.Latitude == nil {
		o.Latitude = -1
	} else {
		o.Latitude = *h.Latitude
	}

	if h.Liked == nil {
		o.Liked = false
	} else {
		o.Liked = *h.Liked
	}

	if h.NumFailures == nil {
		o.NumFailures = 0
	} else {
		o.NumFailures = *h.NumFailures
	}

	if h.Original == nil {
		return nil, errors.New("original cannot be null")
	}
	o.Original = &Objtxt{}
	if h.Original.Id == nil {
		return nil, errors.New("original.id cannot be null")
	}
	o.Original.ID = *h.Original.Id
	if h.Original.Language == nil {
		return nil, errors.New("original.language cannot be null")
	}
	o.Original.Language = *h.Original.Language

	if h.Original.Text != nil {
		o.Original.Text = *h.Original.Text
	}
	if h.Original.SoundUrl != nil {
		o.Original.SoundURL = *h.Original.SoundUrl
	}

	if h.Target == nil || len(*h.Target) == 0 {
		return nil, errors.New("target cannot be null")
	}
	o.Target = make([]*Objtxt, 0, len(*h.Target))
	for i, t := range *h.Target {
		r := &Objtxt{}
		if t.Id == nil {
			return nil, fmt.Errorf("target[%d].id cannot be null", i)
		}
		r.ID = *t.Id
		if t.Language == nil {
			return nil, fmt.Errorf("target[%d].language cannot be null", i)
		}
		r.Language = *t.Language

		if t.Text != nil {
			r.Text = *t.Text
		}
		if t.SoundUrl != nil {
			r.SoundURL = *t.SoundUrl
		}
		o.Target = append(o.Target, r)
	}

	o.BBox = &BBox{
		X: -1,
		Y: -1,
		W: -1,
		H: -1,
	}
	if h.Bbox != nil {
		if h.Bbox.Xx != nil {
			o.BBox.X = *h.Bbox.Xx
		}
		if h.Bbox.Yy != nil {
			o.BBox.Y = *h.Bbox.Yy
		}
		if h.Bbox.Ww != nil {
			o.BBox.W = *h.Bbox.Ww
		}
		if h.Bbox.Hh != nil {
			o.BBox.H = *h.Bbox.Hh
		}
	}

	return o, nil
}

func ObjectFromDAO(o *daocore.Object, oo *daocore.Objtxt, tos []*daocore.Objtxt) *Object {
	object := &Object{
		ID:     o.ID,
		UserID: o.UserID,
		Original: &Objtxt{
			ID:       oo.ID,
			Text:     oo.Text,
			Language: oo.Language,
			SoundURL: oo.SoundUrl,
		},
		Target: make([]*Objtxt, 0, len(tos)),
		BBox: &BBox{
			X: o.BboxX,
			Y: o.BboxY,
			W: o.BboxW,
			H: o.BboxH,
		},
		ImageURL:    o.ImageUrl,
		Caption:     o.Caption,
		Country:     o.Country,
		City:        o.City,
		Latitude:    o.Latitude,
		Longitude:   o.Longitude,
		Liked:       types.Int2Bool(o.Liked),
		NumFailures: o.NumFailure,
	}
	for _, to := range tos {
		object.Target = append(object.Target, &Objtxt{
			ID:       to.ID,
			Text:     to.Text,
			Language: to.Language,
			SoundURL: to.SoundUrl,
		})
	}

	return object
}

func (o *Object) ObjectDAO() *daocore.Object {
	return &daocore.Object{
		ID:               o.ID,
		UserID:           o.UserID,
		OriginalOjbtxtID: o.Original.ID,
		BboxX:            o.BBox.X,
		BboxY:            o.BBox.Y,
		BboxW:            o.BBox.W,
		BboxH:            o.BBox.H,
		ImageUrl:         o.ImageURL,
		Caption:          o.Caption,
		Country:          o.Country,
		City:             o.City,
		Latitude:         o.Latitude,
		Longitude:        o.Longitude,
		Liked:            types.Bool2Int(o.Liked),
		NumFailure:       o.NumFailures,
	}
}

func (o *Object) OriginalObjtxtsDAO() *daocore.Objtxt {
	return &daocore.Objtxt{
		ID:       o.Original.ID,
		Text:     o.Original.Text,
		Language: o.Original.Language,
		SoundUrl: o.Original.SoundURL,
	}
}

func (o *Object) TargetObjtxtsDAO() []*daocore.Objtxt {
	tos := make([]*daocore.Objtxt, 0, len(o.Target))
	for _, to := range o.Target {
		tos = append(tos, &daocore.Objtxt{
			ID:       to.ID,
			Text:     to.Text,
			Language: to.Language,
			SoundUrl: to.SoundURL,
		})
	}
	return tos
}

func (o *Object) ObjectTargetObjtxtsDAO() []*daocore.ObjectTargetObjtxt {
	oos := make([]*daocore.ObjectTargetObjtxt, 0, len(o.Target))
	for _, oo := range o.Target {
		oos = append(oos, &daocore.ObjectTargetObjtxt{
			ObjectID:       o.ID,
			TargetObjtxtID: oo.ID,
		})
	}
	return oos
}

func (o *Object) AllObjtxtsDAO() []*daocore.Objtxt {
	return append([]*daocore.Objtxt{o.OriginalObjtxtsDAO()}, o.TargetObjtxtsDAO()...)
}

func (o *Object) API() *api.Object {
	tos := make([]api.Objtxt, 0, len(o.Target))
	for _, t := range o.Target {
		tos = append(tos, api.Objtxt{
			Id:       &t.ID,
			Language: &t.Language,
			SoundUrl: &t.SoundURL,
			Text:     &t.Text,
		})
	}

	return &api.Object{
		Bbox: &api.Bbox{
			Hh: &o.BBox.H,
			Ww: &o.BBox.W,
			Xx: &o.BBox.X,
			Yy: &o.BBox.Y,
		},
		Caption:     &o.Caption,
		City:        &o.City,
		Country:     &o.Country,
		Id:          &o.ID,
		ImageUrl:    &o.ImageURL,
		Latitude:    &o.Latitude,
		Liked:       &o.Liked,
		Longitude:   &o.Longitude,
		NumFailures: &o.NumFailures,
		Original: &api.Objtxt{
			Id:       &o.Original.ID,
			Language: &o.Original.Language,
			SoundUrl: &o.Original.SoundURL,
			Text:     &o.Original.Text,
		},
		Target: &tos,
	}
}
