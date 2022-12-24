package detection

import (
	"context"
	"github.com/UTokyo-PBL/pbl2022-2022-team6/pkg/comparer"
	"github.com/google/go-cmp/cmp"
	"testing"
)

func TestClient_Detect(t *testing.T) {
	t.Parallel()

	address := "http://34.69.11.219/from-url"

	type args struct {
		url string
	}
	tests := []struct {
		name    string
		ent     Interface
		args    args
		want    *Object
		wantErr bool
	}{
		{
			name: "successful: dog",
			ent:  New(address),
			args: args{
				url: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Terrier_mixed-breed_dog.jpg",
			},
			want: &Object{
				Name: "dog",
				X:    0.58828,
				Y:    0.55371,
				W:    0.82344,
				H:    0.88035,
			},
			wantErr: false,
		},
	}

	ctx := context.Background()

	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			act, err := tc.ent.Detect(ctx, tc.args.url)

			if diff := cmp.Diff(tc.wantErr, err != nil); diff != "" {
				t.Error(diff)
			}
			if diff := cmp.Diff(tc.want, act, comparer.FloatComparer); diff != "" {
				t.Error(diff)
			}
		})
	}
}
