package translation

import "context"

type Interface interface {
	Translate(ctx context.Context, text, from, to string) (string, error)
}

type FakeClient struct {
	address string
}

func NewFake(address string) Interface {
	return &FakeClient{address: address}
}

func (c *FakeClient) Translate(ctx context.Context, text, from, to string) (string, error) {
	return map[string]string{
		"en": "cat",
		"zh": "猫",
		"es": "cat",
		"ja": "猫",
	}[to], nil
}
