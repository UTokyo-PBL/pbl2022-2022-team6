# team6

## usage

view languages

```shell
$ curl http://104.198.116.249/user/signup
```

register user

```shell
$ curl -XPOST \
  -d '{"id":"210e4cee-ba0b-4cb7-848c-2901e3310cee","email":"example@translango.com","password":"passw0rd","first_name":"nakai","last_name":"yu","username":"nakai-yu","language":"ja"}' \
  -H "content-type: application/json" \
  http://104.198.116.249/user/signup
```

login

```shell
$ curl -XPOST -s \
  -d '{"email":"example@translango.com","password":"passw0rd"}' \
  -H "content-type: application/json" \
  --dump-header - \
  http://104.198.116.249/user/login
```

login and save cookie

```shell
$ SESSION=$(curl -XPOST -s \
  -d '{"email":"example@translango.com","password":"passw0rd"}' \
  -H "content-type: application/json" \
  --dump-header - \
  http://104.198.116.249/user/login | \
  grep -E "[s|S]et-[c|C]ookie" | \
  sed -e "s/^.\{12\}//")
```

logout

```shell
$ curl -XPOST \
  -H "content-type: application/json" \
  -H "Cookie: ${SESSION}" \
  http://104.198.116.249/user/logout
```

profile

```shell
$ curl \
  -H "Cookie: ${SESSION}" \
  http://104.198.116.249/user/profile
```