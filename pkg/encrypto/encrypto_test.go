package encrypto

import (
	"github.com/google/go-cmp/cmp"
	"testing"
)

func TestEncrypto(t *testing.T) {
	t.Parallel()

	type args struct {
		pw string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{
			name: "successful case",
			args: args{
				pw: "passw0rd",
			},
			want: "8f0e2f76e22b43e2855189877e7dc1e1e7d98c226c95db247cd1d547928334a9",
		},
	}

	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			actual := Encrypto(tc.args.pw)

			if diff := cmp.Diff(tc.want, actual); diff != "" {
				t.Error(diff)
			}
		})
	}
}
