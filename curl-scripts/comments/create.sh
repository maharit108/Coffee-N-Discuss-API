#!/bin/bash

API="http://localhost:4741"
URL_PATH="/comment"
# article id
curl "${API}${URL_PATH}/${ID}" \
--include \
--request POST \
  --header "Content-type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "comments": {
      "content":  "'"${CONTENT}"'",
      "author": "'"${TOKEN}"'",
      "author_name": "'"${TOKEN}"'"

    }
  }'

echo
