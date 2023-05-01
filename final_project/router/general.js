const express = require('express');
const public_users = express.Router();
const controllers=require("./controllers.js")

public_users.route("/register").post(controllers.createUser);

// Get the book list available in the shop

public_users.route('/')
    .get(controllers.getAllBooks);
// Get book details based on ISBN
public_users.route('/isbn/:isbn').get(controllers.getSingleBook);
  
// Get book details based on author
public_users.route('/author/:author').get(controllers.getBookByAuthor);

// Get all books based on title
public_users.route('/title/:title').get(controllers.getBookByTitle);

//  Get book review
public_users.route('/review/:isbn').get(controllers.addReview);




module.exports.general = public_users;
