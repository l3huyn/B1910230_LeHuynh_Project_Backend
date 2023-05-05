const BooksModel = require("../models/booksModel");
var jwt = require("jsonwebtoken");

const getBooks = (req, res, next) => {
  BooksModel.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getBooksByUser = (req, res, next) => {
  const idAuth = req.params.id;
  BooksModel.find({ idAuth: idAuth })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getOneBook = (req, res, next) => {
  const id = req.params.id;
  BooksModel.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const postBooks = (req, res, next) => {
  const title = req.body.title;
  const img = req.body.img;
  const desc = req.body.desc;
  const content = req.body.content;
  const token = req.body.token;

  try {
    const idAuth = jwt.verify(token, "reviewbooks")._id;
    BooksModel.create({
      title: title,
      img: img,
      desc: desc,
      content: content,
      idAuth: idAuth,
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ messageError: "Cannot create, try again!" });
      });
  } catch (err) {
    res.json({ messageError: "Please sign up and try again!" });
  }
};

const deleteOneBook = (req, res, next) => {
  const id = req.params.id;
  BooksModel.findByIdAndDelete(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const updateOneBook = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const img = req.body.img;
  const desc = req.body.desc;
  const content = req.body.content;

  BooksModel.findByIdAndUpdate(
    id,
    {
      title: title,
      img: img,
      desc: desc,
      content: content,
    },
    { returnDocument: "after" }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("Error");
    });
};

module.exports = {
  getBooks,
  getOneBook,
  postBooks,
  deleteOneBook,
  updateOneBook,
  getBooksByUser,
};
