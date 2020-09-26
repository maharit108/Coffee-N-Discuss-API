# Coffee-Talks

This is the back end server for the Coffee-Talks (social media application). API requests for CRUD operations requested from the Front-end Coffee-Talks are handled in this application. It has a noSQL database (mongoDB) where interaction with 3 types of resources (users, articles and comments) is facilitated using mongoose. Express Framework is used to build this application. This application is deployed on Heroku.

## Links

**Deployed Application:** <https://guarded-sea-52498.herokuapp.com> + </URI_from_documenation>

**API Documentations:** <https://github.com/maharit108/Coffee-Talk-API/blob/master/API_doc.md>

**Front-End Repo:** <https://github.com/maharit108/Coffee-Talk>

**Front End Deployed Site:** <https://maharit108.github.io/Coffee-Talk/>

## Technologies Used
  - express framework
  - mongoose
  - MongoDB
  - node
  - Heroku

## Planning Story
This application initially started with just 2 resources- users and articles. The idea was to create, edit, show and delete articles created by an user. User information (email/username and password) would be stored in users resource document and article informations (content, author-user who created it, and timestamps) in articles resource document. The 2 documents are linked using mongoose reference.

It allowed a user would be to CREATE an account, sign in (GET), change password (PATCH) once signed in and sign out (DELETE). any user (no need token) can view all articles (GET request) ever created but only a signed in user (header bears a token) is able to CREATE an article, and edit (PATCH request) and delete articles (DELETE) that he owns (id of creator user is same as the logged in user)

Once this MVP was achieved, the application was upgraded so that it now had a third resource- comments. Comments were sub-document of articles which can be created by any user with token (logged in) on any articles. Comment and user who creates it are also linked using mongoose reference. If the user has ownership,similar to articles, user can also edit/ delete comment.
Lastly, upvote, downvote and voter_list was added to articles, which basically made it possible to make patch request, adding number of like/deslike to upvote and downvote fields in article model. Voter_list stores the email/username of the user who made the up/downvote so that the user can be limited to make only one vote per article.

## User Stories
  - As a client, I would like to be able to make user accounts and sign in (CREATE, GET requests)so that my personal operations can only be done by me.
  - As a client, I would like to make PATCH request to change passwork and DELETE request to sign out.
  - As a client, I would like to be able to make GET request to show/index my articles.
  - As a client, I would like to make GET request without having to sign in, so that everyone can see my articles, read, like/dislike and comment on them
  - As a client, I would like to make POST, PATCH and DELETE requests only if I am signed in, so that only i can make changes to my articles/comments.
  - As a client, I would like to be able to make POST request to create an article/comment.
  - As a client, I would like to be able to make PATCH request to modify my article/comment.
  - As a client, I would like to be able to make DELETE request to delete my article/comment.
___
## Unsolved Problems/ Future Upgrades
This project along with the Front end application interacting with this API was build in the course of a week. Due to time constraints, some features couldn't be added. Some features I would add in the future are:
  - Add like/dislike to comments model.
  - Add tags to articles model so that articles can be sorted based on the tags (sports, politics, science, programming etc.)
___
## ERD
<img src='.\erd.jpg' />
