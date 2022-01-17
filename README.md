# Billomat Profile
![lenguague JavaScript](https://img.shields.io/badge/lenguague-javascript-yellow.svg)
![framework Express](https://img.shields.io/badge/framework-express-blue.svg)
![test Jest](https://img.shields.io/badge/test-jest-orange.svg)
![documentation Swagger](https://img.shields.io/badge/documentation-swagger-green.svg)

A Rest API to handle user profile information builded on NodeJs.


## Run with docker
```
docker-compose up -d
```
>To verify if the application is running You could call to `http://localhost:3000/ping`. If the response is `{message: 'pong'}` the application is healthy!

## Local setup

Requirements: `node v14`, `npm 6` & `mongodb`.
```
cp .env.exmaple .env
npm install
npm start
```
>To verify if the application is running You could call to `http://localhost:3000/ping`. If the response is `{message: 'pong'}` the application is healthy!
### Run tests

```
npm test
```
### Run linter

```
npm run linter
```



## Documentation

### Swagger
Swagger is a set of open-source tools that can help you design, build, document and consume REST APIs.
```
http://localhost:3000/docs/api/v1
```
Here you can find the documentation related to the definition, possible responses of endpoints and their consumption. Swagger documentation share the same application host and port.

### Postman collection
A postman collection allow You to import directly all the cURLs in postman without import each one by one. This file it's located in `{PROJECT_FOLDER}/docs/billomat_profile.postman_collection.json`.

### Endpoints 
You need to have `cURL` tool installed in Your system to call the endpoints below.

#### Create user
Request:
```js
curl --location --request POST 'localhost:3000/api/v1/users' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Joe Doe",
  "age": 30,
  "bio": "A very special guy",
  "image": "http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png"
}'
```
#### Get all users
Request:
```js
curl --location --request GET 'localhost:3000/api/v1/users'
```

#### Find user by id
Request:
```js
curl --location --request GET 'localhost:3000/api/v1/users/000000000000000000000001'
```

#### Update user by id
Request:
```js
curl --location --request PUT 'localhost:3000/api/v1/users/000000000000000000000001' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Joe Frederic Doe",
  "age": 23,
  "bio": "A very special guy!",
  "image": "http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile_1.png"
}'
```

#### Delete user by id
Request:
```js
curl --location --request DELETE 'localhost:3000/api/v1/users/000000000000000000000001'
```

#### Get average users statistics
Request:
```js
curl --location --request GET 'localhost:3000/api/v1/statistics/avg'
```

[back top](#Billomat-Profile)
