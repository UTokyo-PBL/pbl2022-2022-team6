package detection

import (
	"context"
	"encoding/json"
	"github.com/pkg/errors"
	"io/ioutil"
	"net/http"
	"net/url"
	"sort"
	"strings"
	"time"
)

type Object struct {
	Name string
	X    float64
	Y    float64
	W    float64
	H    float64
}

type Interface interface {
	Detect(ctx context.Context, uri string) (*Object, error)
}

type FakeClient struct {
	address string
}

func NewFake(address string) Interface {
	return &FakeClient{address: address}
}

func (c *FakeClient) Detect(ctx context.Context, uri string) (*Object, error) {
	return &Object{
		Name: "cat",
		X:    0.1,
		Y:    0.1,
		W:    0.1,
		H:    0.1,
	}, nil
}

type Client struct {
	address string
}

type Payload struct {
	Url string `json:"url"`
	To  string `json:"target_lang"`
}

type Detection struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	X           float64 `json:"x"`
	Y           float64 `json:"y"`
	W           float64 `json:"w"`
	H           float64 `json:"h"`
	Conf        float64 `json:"conf"`
	Translation string  `json:"translation"`
}

type Response struct {
	Error      string       `json:"error"`
	ErrorMsg   string       `json:"error_msg"`
	Detections []*Detection `json:"detections"`
}

func (c *Client) Detect(ctx context.Context, uri string) (*Object, error) {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	form := url.Values{}
	form.Add("url", uri)
	form.Add("target_lang", "en")

	payload := strings.NewReader(form.Encode())

	req, err := http.NewRequest(http.MethodPost, c.address, payload)
	if err != nil {
		return nil, errors.Wrap(err, "Detect failed to prepare request")
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := new(http.Client)
	resp, err := client.Do(req)
	if err != nil {
		return nil, errors.Wrap(err, "Detect failed to call detection API")
	}
	defer resp.Body.Close()

	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.Wrap(err, "Detect failed to read response body")
	}

	var r Response

	if err := json.Unmarshal(b, &r); err != nil {
		return nil, errors.Wrap(err, "Detect failed to unmarshal response")
	}

	if len(r.Detections) == 0 {
		return nil, errors.New("Detect found no objects")
	}

	sort.Slice(r.Detections, func(i, j int) bool {
		return r.Detections[i].Conf > r.Detections[j].Conf
	})

	top := r.Detections[0]

	return &Object{
		Name: top.Name,
		X:    top.X,
		Y:    top.Y,
		W:    top.W,
		H:    top.H,
	}, nil
}

func New(address string) Interface {
	return &Client{address: address}
}
