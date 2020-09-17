#!/bin/bash

API="http://localhost:4741"
URL_PATH="/article"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "article": {
      "content": "'"${CONTENT}"'",
      "author": "'"${TOKEN}"'"
    }
  }'

echo
