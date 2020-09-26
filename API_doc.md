# Coffee Talks API Documentation

This is an API to store and handle CRUD operations for articles and comments in Coffee-Talks Front end.

## API End Points

|Resource | Verb   | Request URI            |Request Headers|Request Body   | Action            |Response Success Status|Response Body  |
|--------|--------|------------------------|---------------|---------------|-------------------|---------------|---------------|
|users   | POST   | `/sign-up`             |      Empty    |credentials    | `user signup`    |200, OK         |user           |
|        | POST   | `/sign-in`             |      Empty    |credentials    | `user signin`    |200, OK         |user w/ token  |
|        | DELETE | `/sign-out`            |      Token    |Empty          | `user signout`   |204, No Content |Empty          |
|        | PATCH  | `/change-password`     |      Token    |passwords      | `user changepw`  |201, Created    |user w/ token  |
|articles| GET    | `/articles`            |      Empty    |     Empty     | `Articles Index`  |200, OK        |article        |
|        | GET    | `/articles/:id` (id-> userId) |      Token    |     Empty     | `Articles Show`   |200, OK            |article |
|        | POST   | `/article`             |      Token    |     article   | `Articles Create` |201, Created       |article        |
|        | PATCH  | `/article/:id`         |      Token    |     article   | `Articles Update` |201, Edit Complete | empty         |
|        | PATCH  | `/articleVote/:id`     |      Token    |     article   | `Votes Update`    |201, Vote Listed   | empty         |
|        | DELETE | `/article/:id`         |      Token    |     Empty     | `Articles Delete` |204, No Content    | empty         |
|comments| POST   | `/comment/:id` (id-> articleId)|      Token    |     comments  | `Comments Create` |201,Created Comment| empty |
|        | PATCH  | `/comment/:idCom`      |      Token    |     comments  | `Comments Update` |201, Edit Complete | empty         |
|        | DELETE | `/comment/:idCom`      |      Token    |     Empty     | `Comments Delete` |204, No Content    | empty         |
