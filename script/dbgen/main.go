package main

import (
	"bytes"
	_ "embed"
	"encoding/json"
	"flag"
	"log"
	"os"
	"path/filepath"
	"text/template"

	"github.com/nagaseitteam/allocation-app/dao/src/util/name"
)

var excludeTables = map[string]bool{
	"schema_migrations": true,
}

type DataType string

const (
	Char      DataType = "char"
	VarChar   DataType = "varchar"
	TinyInt   DataType = "tinyint"
	SmallInt  DataType = "smallint"
	Int       DataType = "int"
	BigInt    DataType = "bigint"
	TimeStamp DataType = "timestamp"
	Date      DataType = "date"
	Float     DataType = "float"
	Double    DataType = "double"
)

var golangTypeMapper = map[DataType]string{
	Char:      "string",
	VarChar:   "string",
	TinyInt:   "int",
	SmallInt:  "int",
	Int:       "int",
	BigInt:    "int",
	TimeStamp: "*time.Time",
	Date:      "*time.Time",
	Float:     "float32",
	Double:    "float64",
}

type XOSchemaJSON struct {
	Schemas []Schema
}

type Schema struct {
	Type   string
	Name   string
	Tables []Table
}

func (s XOSchemaJSON) Tables() []Table {
	res := make([]Table, 0)
	for _, ss := range s.Schemas {
		res = append(res, ss.Tables...)
	}
	return res
}

type Table struct {
	Name    string
	Columns []Column
	Indexes []Index
}

func (t Table) GoName() string {
	return name.GoPublicName(t.Name)
}

type Column struct {
	Name     string
	Datatype struct {
		Type DataType
		Prec int
	}
	IsPrimary bool `json:"is_primary"`
}

func (c Column) GoName() string {
	return name.GoPublicName(c.Name)
}

func (c Column) GoType() string {
	return golangTypeMapper[c.Datatype.Type]
}

func (c Column) IsMagicColumn() bool {
	return (c.Name == "created_at" && c.Datatype.Type == TimeStamp) || (c.Name == "updated_at" && c.Datatype.Type == TimeStamp)
}

type Index struct {
	Name      string
	Fields    []Column
	IsUnique  bool `json:"is_unique"`
	IsPrimary bool `json:"is_primary"`
}

func (i Index) Tail(v int) bool {
	return v == len(i.Fields)-1
}

//go:embed templates/root.go.tpl
var rootTpl []byte

//go:embed templates/metadata.go.tpl
var metadataTpl []byte

//go:embed templates/typedef.go.tpl
var typedefTpl []byte

//go:embed templates/query.go.tpl
var queryTpl []byte

//go:embed templates/command.go.tpl
var commandTpl []byte

type output struct {
	name string
	data []byte
}

func (o output) write() error {
	const (
		outdir = "gen/daocore"
		ext    = ".gen.go"
	)
	return os.WriteFile(filepath.Join(outdir, o.name+ext), o.data, os.ModePerm)
}

func main() {
	flag.Parse()
	schema, err := readSchema(flag.Arg(0))
	if err != nil {
		log.Fatal(err, ":", flag.Arg(0))
	}

	outputs := make([]output, 0)
	for _, t := range schema.Tables() {
		if excludeTables[t.Name] {
			continue
		}
		code, err := renderTable(t)
		if err != nil {
			log.Fatal(err)
		}
		outputs = append(outputs, output{t.Name, code})
	}
	for _, out := range outputs {
		if err := out.write(); err != nil {
			log.Fatal(err)
		}
	}
}

func readSchema(path string) (XOSchemaJSON, error) {
	schemafile, err := os.ReadFile(path)
	if err != nil {
		return XOSchemaJSON{}, err
	}
	var schema XOSchemaJSON
	if err := json.Unmarshal(schemafile, &schema); err != nil {
		log.Fatal(err)
	}
	return schema, nil
}

func renderTable(t Table) ([]byte, error) {
	tmpl, err := template.New("root").Parse(string(rootTpl))
	if err != nil {
		return nil, err
	}
	tmpl, err = tmpl.AddParseTree("metadata", template.Must(template.New("metadata").Parse(string(metadataTpl))).Tree)
	if err != nil {
		return nil, err
	}
	tmpl, err = tmpl.AddParseTree("typedef", template.Must(template.New("typedef").Parse(string(typedefTpl))).Tree)
	if err != nil {
		return nil, err
	}
	tmpl, err = tmpl.AddParseTree("query", template.Must(template.New("query").Parse(string(queryTpl))).Tree)
	if err != nil {
		return nil, err
	}
	tmpl, err = tmpl.AddParseTree("command", template.Must(template.New("command").Parse(string(commandTpl))).Tree)
	if err != nil {
		return nil, err
	}
	buffer := new(bytes.Buffer)
	if err := tmpl.ExecuteTemplate(buffer, "root", t); err != nil {
		return nil, err
	}
	return buffer.Bytes(), nil
}
