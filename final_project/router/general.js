const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  var username=req.body.username;
  var password=req.body.password;
  if(!username || !password){
      return res.status(400).json({"Message":"username and password required"})
  }
  if(isValid(username)){
    return res.status(400).json({"Message":"username is not valid"})
  }
  var obj1={
      username:username,
      password:password
  }
  users.push(obj1)
  res.status(200).json({"message":"username "+username+" "+" successfully registered"})
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.json(books);
  res.sendStatus(200)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn=req.params.isbn;
    res.json(books[isbn]);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author=req.params.author
    let array=[]
    let keys=Object.keys(books)
    let values = keys.filter(key=>books[key].author==author)
    values.map(value=>array.push(books[value]))
    res.json(array)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title=req.params.title
    let array=[]
    let keys=Object.keys(books)
    let values = keys.filter(key=>books[key].title==title)
    values.map(value=>array.push(books[value]))
    res.json(array)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn=req.params.isbn;
    res.json({"review":books[isbn].reviews});
});

module.exports.general = public_users;
