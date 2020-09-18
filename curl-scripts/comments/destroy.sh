#!/bin/bash

API="http://localhost:4741"
URL_PATH="/comment"
# id- comment id
curl "${API}${URL_PATH}/${ID}" \
--include \
--request DELETE \
  --header "Content-type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \


echo
