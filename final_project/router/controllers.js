let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const createUser=(req,res) => {
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
  }
const getAllBooks=(req, res)=>{
    res.json(books);
    res.sendStatus(200)
}
const getSingleBook=(req, res)=>{
    let isbn=req.params.isbn;
    res.json(books[isbn]);
}
const getBookByAuthor=(req, res)=>{
    let author=req.params.author
    let array=[]
    let keys=Object.keys(books)
    let values = keys.filter(key=>books[key].author==author)
    values.map(value=>array.push(books[value]))
    res.json(array)
}
const getBookByTitle=(req, res)=>{
    let title=req.params.title
    let array=[]
    let keys=Object.keys(books)
    let values = keys.filter(key=>books[key].title==title)
    values.map(value=>array.push(books[value]))
    res.json(array)
}
const addReview=(req, res)=>{
    let isbn=req.params.isbn;
    res.json({"review":books[isbn].reviews});
}

module.exports={createUser,getAllBooks,getSingleBook,getBookByAuthor,getBookByTitle,addReview}