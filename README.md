# team6

## usage

view languages

```shell
$ curl localhost:8000/user/signup
```

register user

```shell
$ curl -XPOST \
  -d '{"id":"210e4cee-ba0b-4cb7-848c-2901e3310cee","email":"example@translango.com","password":"passw0rd","first_name":"nakai","last_name":"yu","username":"nakai-yu","language":"ja"}' \
  -H "content-type: application/json" \
  localhost:8000/user/signup
```

login

```shell
$ curl -XPOST \
  -d '{"email":"example@translango.com","password":"passw0rd"}' \
  -H "content-type: application/json" \
  --dump-header - \
  localhost:8000/user/login
```