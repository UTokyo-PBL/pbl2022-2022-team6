package detection

import "context"

type Object struct {
	Name string
	X    float64
	Y    float64
	W    float64
	H    float64
}

type Interface interface {
	Detect(ctx context.Context, url string) (*Object, error)
}

type FakeClient struct {
	address string
}

func NewFake(address string) Interface {
	return &FakeClient{address: address}
}

func (c *FakeClient) Detect(ctx context.Context, url string) (*Object, error) {
	return &Object{
		Name: "cat",
		X:    0.1,
		Y:    0.1,
		W:    0.1,
		H:    0.1,
	}, nil
}
