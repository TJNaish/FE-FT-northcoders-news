# Northcoders News Front End

[Click here to go to the deployed demo](http://cranky-newton-86c1dc.netlify.com)

## Introduction

This project demonstrates a front end for an article based content site, created with React.

The back end of this project was also created as a demonstration project, and can be found [here](https://github.com/TJNaish/BE-FT-northcoders-news).

This front end was created using the following dependencies:

- NodeJS V8.10.0
- Axios v0.18.0
- React v16.4.2
- React Dom v16.4.2
- React Router Dom v4.3.1
- React Scripts v1.1.4

If you are looking to run this as a local project, you will need to ensure you have these dependencies installed in the project folder. This can be done by entering the command "npm install" from your terminal while in the root folder of the project. You can then start the development build server by typing "npm start".

## Functionality

### Style

This page was created using Flexbox css options, and as such is dynamic and will scale with the size of the users screen. At all screen sizes the content should be legible, and no functionality lost.

### Navbar

This front end acts as a user interface for a blog style site. All pages have access to a nav bar at the top, which links back to the home page, and to a topic page which allows you to filter articles pertaining to each topic.

There is also a login section at the top. In order to login you must enter a username that exists in the user database, and enter a password. This can eventually be used as a full authentication device, however in this development build it is limited in its functionality. You can sign in as any of the existing users on the site by entering their username in both the username and password field, and clicking submit. This will then display which user you are logged in as, and allow you to logout.

### Homepage

The homepage of the site lists all articles in chronological order (newest first). You can click on the title of any article to be taken to its content page, and any username to be taken to a mock user page with more information about the user.

All the article listed are colour coded depending on their topic.

The articles list their current "vote" value, their title, which user created the article, the date which is was created, and the topic it has been assigned.

### Topics

The topic page is functionally the same as the homepage, however it will only display articles pertaining to the chosen topic. Simply click the topic name and the article list will populate for you.

### Article

Each article page shows the title, vote value, and user who created the article at the top. The body of the article is then displayed directly beneath it.

Underneath the body is a comment section unique to each article. When not logged in you can see the comments posted by all users, the votes that comment has, the user who made the comment, and the date it was created.

When you are not logged in this is all you will see, however when you are the page will provide more options.

When you are logged in as any user, a comment box will appear. Anything can be typed here and will be submitted when enter is pressed. This will add the comment to the top of the comments list right away.

If you are logged in as a user other than the user who created the article, you will see arrows around the current vote value, and this will allow you to change the score up or down by 1. If you are logged in as the same user who created the article, this option will not be displayed.
This also happens for the comments, where you will be able to vote on any comments that are not your own. Any comments that belong to the currently logged in user will also have a 'Delete Comment' link, which will immediately remove the comment from the article.

All voting and deleting comments happens right away, so you can see the changes right away.

### User

When clicking on a username, you will be taken to a user page which will show the users real name, and an avatar they have chosen.
