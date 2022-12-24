package translation

import (
	"context"
	"github.com/google/go-cmp/cmp"
	"testing"
)

func TestClient_Translate(t *testing.T) {
	t.Parallel()

	address := "http://34.69.11.219/text-translate"

	type args struct {
		text string
		from string
		to   string
	}
	tests := []struct {
		name    string
		ent     Interface
		args    args
		want    string
		wantErr bool
	}{
		{
			name: "successful: en -> ja",
			ent:  New(address),
			args: args{
				text: "hello",
				from: "en",
				to:   "ja",
			},
			want:    "こんにちは",
			wantErr: false,
		},
	}

	ctx := context.Background()

	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			act, err := tc.ent.Translate(ctx, tc.args.text, tc.args.from, tc.args.to)

			if diff := cmp.Diff(tc.wantErr, err != nil); diff != "" {
				t.Error(diff)
			}
			if diff := cmp.Diff(tc.want, act); diff != "" {
				t.Error(diff)
			}
		})
	}
}
