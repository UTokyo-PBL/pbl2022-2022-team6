{{- define "typedef" -}}
{{- $table := . -}}
type {{ $table.GoName }} struct {
    {{- range $table.Columns }}
    {{ .GoName }} {{ .GoType }}
    {{- end}}
}

func (t *{{ $table.GoName }}) Values() []interface{} {
    return []interface{}{
        {{- range $table.Columns -}}
        {{- if not .IsMagicColumn }}
        t.{{ .GoName }},
        {{- end }}
        {{- end }}
    }
}

func (t *{{ $table.GoName }}) SetMap() map[string]interface{} {
    return map[string]interface{}{
        {{- range $table.Columns -}}
        {{- if not .IsMagicColumn }}
        "{{ .Name }}": t.{{ .GoName }},
        {{- end }}
        {{- end }}
    }
}

func (t *{{ $table.GoName }}) Ptrs() []interface{} {
    return []interface{}{
        {{- range $table.Columns }}
        &t.{{ .GoName }},
        {{- end }}
    }
}
{{ end }}