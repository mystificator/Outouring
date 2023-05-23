# Outouring
> A Node.js web application project with CRUD functionalities to submit your favourite places and review other posts.

## Live Demo

To see the app in action, go to [https://outouring.onrender.com/](https://outouring.onrender.com/)
- Demo credentials: username: "demo" & password: "demo"

## Features

* Authentication:
  
  * First time users have to register with username, email and password
  * User login with username and password

* Authorization:

  * One cannot manage posts and view user profile without being authenticated

  * One cannot edit or delete posts and comments created by other users

* Manage the posts with basic functionalities:

  * Create, edit and delete posts and comments

  * Upload photos for a place

  * Display place location on Mapbox Maps
  
  * Search existing place

* Flash messages responding to users' interaction with the app

## Built with

### Technologies
* [Node](https://nodejs.org/en) & [Express](https://expressjs.com/) for creating backend
* [MongoDB Atlas](https://www.mongodb.com/atlas) for storing places, users and reviews
* [Bootstrap](https://getbootstrap.com/) & [ejs](https://ejs.co/) for styling
* [Passport.js](http://www.passportjs.org/) middleware for authentication

### Platforms

* [Cloudinary](https://cloudinary.com/)
* [Render](https://render.com/)
