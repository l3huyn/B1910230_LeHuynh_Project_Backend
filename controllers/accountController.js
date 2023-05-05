const AccountModel = require("../models/accountModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const getOneAccount = (req, res, next) => {
  const id = req.params.id;
  AccountModel.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const postAccount = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  AccountModel.create({
    username: username,
    password: password,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({errMessage: "User da ton tai"});
    });
};

const loginAccount = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  AccountModel.findOne({
    username: username,
  })
    .then((data) => {
      if (data) {
        bcrypt.compare(password, data.password, function (err, result) {
          if (result) {
            var token = jwt.sign(
              {
                _id: data._id,
              },
              "reviewbooks"
            );
            //10 ngay
            res.cookie("token", token, {
              expires: new Date(Date.now() + 864000000),
            });
            res.json({ message: "Login Success", token: token, data });
          } else {
            res.json({ wrongPassword: "Wrong password" });
          }
        });
      } else {
        res.json({ wrongUsername: "Username doesn't exits" });
      }
    })
    .catch((err) => {
      res.json({ message: "Have a error server" });
    });
};


module.exports = {
  getOneAccount,
  postAccount,
  loginAccount,
};
