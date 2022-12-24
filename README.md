# team6

## usage

view languages

```shell
$ curl https://translango.y-nakai.com/user/signup
```

register user

```shell
$ curl -XPOST \
  -d '{"id":"210e4cee-ba0b-4cb7-848c-2901e3310cee","email":"example@translango.com","password":"passw0rd","first_name":"nakai","last_name":"yu","username":"nakai-yu","language":"ja"}' \
  -H "content-type: application/json" \
  https://translango.y-nakai.com/user/signup
```

login

```shell
$ curl -XPOST -s \
  -d '{"email":"example@translango.com","password":"passw0rd"}' \
  -H "content-type: application/json" \
  --dump-header - \
  https://translango.y-nakai.com/user/login
```

login and save cookie

```shell
$ SESSION=$(curl -XPOST -s \
  -d '{"email":"example@translango.com","password":"passw0rd"}' \
  -H "content-type: application/json" \
  --dump-header - \
  https://translango.y-nakai.com/user/login | \
  grep -E "[s|S]et-[c|C]ookie" | \
  sed -e "s/^.\{12\}//")
```

logout

```shell
$ curl -XPOST \
  -H "content-type: application/json" \
  -H "Cookie: ${SESSION}" \
  https://translango.y-nakai.com/user/logout
```

profile

```shell
$ curl \
  -H "Cookie: ${SESSION}" \
  https://translango.y-nakai.com/user/profile
```

edit profile


```shell
$ curl -XPOST \
  -d '{"id":"210e4cee-ba0b-4cb7-848c-2901e3310cee","email":"example@translango.com","password":"passw0rd","first_name":"nakai","last_name":"yu","username":"nakai-yu","language":"ja"}' \
  -H "content-type: application/json" \
  -H "Cookie: ${SESSION}" \
  https://translango.y-nakai.com/user/profile
```

dashboard/top

```shell
$ curl \
  -H "Cookie: ${SESSION}" \
  https://translango.y-nakai.com/dashboard/top
```

edit dashboard/top

```shell
$ curl -XPOST \
  -d '{"languages": ["ja"]}' \
  -H "content-type: application/json" \
  -H "Cookie: ${SESSION}" \
  https://translango.y-nakai.com/dashboard/top
```

get objects

```shell
$ curl \
  -H "Cookie: ${SESSION}" \
  https://translango.y-nakai.com/dashboard/histories
```

detect object

```shell
$ curl -XPOST \
  -d '{"id":"8d5eeaff-654d-4cde-a075-07d2a04c26be","image_url":"https://dime.jp/genre/files/2020/11/44817f7cc02f549d516a94cc2710c53f.png","original":{"id":"5c81a2c7-7075-4e61-9e22-897792d62510", "language":"en"}, "target": [{"id":"58cb8ec4-ab50-4cdc-a553-dcefb68aad2b", "language": "ja"}]}' \
  -H "content-type: application/json" \
  "https://translango.y-nakai.com/dashboard/histories?type=object"
```

```shell
$ curl -XPOST \
  -d '{"id":"8d5eeaff-654d-4cde-a075-07d2a04c26be","image_url":"https://car-mo.jp/mag/wp-content/uploads/2020/12/4201119-n-one_101H.jpg","original":{"id":"5c81a2c7-7075-4e61-9e22-897792d62510", "language":"en"}, "target": [{"id":"58cb8ec4-ab50-4cdc-a553-dcefb68aad2b", "language": "hi"}]}' \
  -H "content-type: application/json" \
  "https://translango.y-nakai.com/dashboard/histories?type=object"
```

```shell
$ curl -XPOST \
  -d '{"id":"8d5eeaff-654d-4cde-a075-07d2a04c26be","image_url":"https://dime.jp/genre/files/2020/11/44817f7cc02f549d516a94cc2710c53f.png","original":{"id":"5c81a2c7-7075-4e61-9e22-897792d62510", "language":"en"}, "target": [{"id":"58cb8ec4-ab50-4cdc-a553-dcefb68aad2b", "language": "ja"}]}' \
  -H "content-type: application/json" \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/histories?type=object"
```

translate

```shell
$ curl -XPOST \
  -d '{"id":"ee520bd2-ca07-48ff-9838-5549811cdb6d","original":{"id":"15fcfaa7-5fc1-4a3b-b86a-074f8dac6856","language":"en","text":"cat"}, "target": [{"id":"b2f65661-aabc-4b36-b3d4-d2823c6b9e1a", "language": "ja"}]}' \
  -H "content-type: application/json" \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/histories?type=text"
```

```shell
$ curl -XPOST \
  -d '{"id":"ee520bd2-ca07-48ff-9838-5549811cdb6d","original":{"id":"15fcfaa7-5fc1-4a3b-b86a-074f8dac6856","language":"en","text":"Tall Taller Tallest"}, "target": [{"id":"b2f65661-aabc-4b36-b3d4-d2823c6b9e1a", "language": "ja"}]}' \
  -H "content-type: application/json" \
  "https://translango.y-nakai.com/dashboard/histories?type=text"
```

get object

```shell
$ curl \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/histories/8d5eeaff-654d-4cde-a075-07d2a04c26be"
```

delete object

```shell
$ curl -XDELETE \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/histories/8d5eeaff-654d-4cde-a075-07d2a04c26be"
```

like

```shell
$ curl -XPOST \
  -d '{"liked":true}' \
  -H "content-type: application/json" \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/histories/8d5eeaff-654d-4cde-a075-07d2a04c26be/liked"
```

caption

```shell
$ curl -XPOST \
  -d '{"caption":"nice to meet you"}' \
  -H "content-type: application/json" \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/histories/8d5eeaff-654d-4cde-a075-07d2a04c26be/caption"
```

increment num failures

```shell
$ curl -XPOST \
  -d '{"num_failures": 1}' \
  -H "content-type: application/json" \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/histories/8d5eeaff-654d-4cde-a075-07d2a04c26be/num_failures"
```

update translation

```shell
$ curl -XPOST \
  -d '{"original":{"id":"5c81a2c7-7075-4e61-9e22-897792d62510","text":"猫","language":"zh"}}' \
  -H "content-type: application/json" \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/histories/8d5eeaff-654d-4cde-a075-07d2a04c26be/original"
```

list

```shell
$ curl \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/lists"
```

create custom list

```shell
$ curl -XPOST \
  -d '{"id":"8e23947f-5fc0-41a5-b24b-7adc1d4b8bf9","icon-name":"US","name":"english","objects":[{"id":"8d5eeaff-654d-4cde-a075-07d2a04c26be"}]}' \
  -H "content-type: application/json" \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/lists"
```

get custom list

```shell
$ curl \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/lists/8e23947f-5fc0-41a5-b24b-7adc1d4b8bf9?num_questions=2"
```

get all list

```shell
$ curl \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/lists/210e4cee-ba0b-4cb7-848c-2901e3310cee?num_questions=2"
```

update custom list

```shell
$ curl -XPUT \
  -d '{"id":"8e23947f-5fc0-41a5-b24b-7adc1d4b8bf9","icon-name":"US","name":"english","objects":[{"id":"8d5eeaff-654d-4cde-a075-07d2a04c26be"}]}' \
  -H "content-type: application/json" \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/lists/8e23947f-5fc0-41a5-b24b-7adc1d4b8bf9"
```

delete custom list

```shell
$ curl -XDELETE \
  -H "Cookie: ${SESSION}" \
  "https://translango.y-nakai.com/dashboard/lists/8e23947f-5fc0-41a5-b24b-7adc1d4b8bf9"
```
