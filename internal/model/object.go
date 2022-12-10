package model

import (
	"errors"
	"fmt"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/daocore"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/types"

	"github.com/UTokyo-PBL/pbl2022-2022-team6/gen/api"
)

type Objtxt struct {
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

func ObjectFromAPI(h *api.Object) (*Object, error) {
	o := new(Object)

	if h == nil {
		return nil, errors.New("object have not been parsed")
	}

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
		ID: o.ID,
		Original: &Objtxt{
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
			Text:     to.Text,
			Language: to.Language,
			SoundURL: to.SoundUrl,
		})
	}

	return object
}

func (o *Object) ObjectDAO(userID string, originalObjtxtID int) *daocore.Object {
	return &daocore.Object{
		ID:               o.ID,
		UserID:           userID,
		OriginalOjbtxtID: originalObjtxtID,
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

func (o *Object) OriginalObjtxtDAO() *daocore.Objtxt {
	return &daocore.Objtxt{
		Text:     o.Original.Text,
		Language: o.Original.Language,
		SoundUrl: o.Original.SoundURL,
	}
}

func (o *Object) TargetObjtxtsDAO() []*daocore.Objtxt {
	os := make([]*daocore.Objtxt, 0, len(o.Target))
	for _, o := range o.Target {
		os = append(os, &daocore.Objtxt{
			Text:     o.Text,
			Language: o.Language,
			SoundUrl: o.SoundURL,
		})
	}
	return os
}

func (o *Object) API() *api.Object {

	tos := make([]api.Objtxt, 0, len(o.Target))
	for _, t := range o.Target {
		tos = append(tos, api.Objtxt{
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
			Language: &o.Original.Language,
			SoundUrl: &o.Original.SoundURL,
			Text:     &o.Original.Text,
		},
		Target: &tos,
	}
}
