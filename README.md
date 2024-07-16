# Quiz - APP

This is a react based app with Pocketbase as backend for authentication and database.

## Features

- Authentication with username and password
- Responsive
- Realtime data
- React router - SPA

## Front-end Installation

to install the front-end just pull the repo and run

```
npm install
# then
npm run dev
```

## Back-end

for Back-end you need to download the executable pocketbase and import this json.

> the lib folder contains the pocketbase.js file that connects to the Back-end with the local ip address change the url to your machine's ip

```json
[
  {
    "id": "_pb_users_auth_",
    "name": "users",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "users_name",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "g7gwgnxm",
        "name": "scores",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      }
    ],
    "indexes": [],
    "listRule": "id = @request.auth.id",
    "viewRule": "id = @request.auth.id",
    "createRule": "",
    "updateRule": "id = @request.auth.id",
    "deleteRule": "id = @request.auth.id",
    "options": {
      "allowEmailAuth": false,
      "allowOAuth2Auth": false,
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": null,
      "minPasswordLength": 5,
      "onlyEmailDomains": null,
      "onlyVerified": false,
      "requireEmail": false
    }
  }
]
```
