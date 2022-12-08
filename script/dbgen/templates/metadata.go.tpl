{{ define "metadata" -}}
{{- $table := . -}}
const {{ $table.GoName }}TableName = "{{ $table.Name }}"

var {{ $table.GoName }}AllColumns = []string{
    {{- range $table.Columns }}
    "{{ .Name }}",
    {{- end }}
}

var {{ $table.GoName }}ColumnsWOMagics = []string{
    {{- range $table.Columns }}
    {{- if not .IsMagicColumn }}
    "{{ .Name }}",
    {{- end }}
    {{- end }}
}

var {{ $table.GoName }}PrimaryKeyColumns = []string{
    {{- range $table.Columns }}
    {{- if .IsPrimary }}
    "{{ .Name }}",
    {{- end }}
    {{- end }}
}
{{ end }}