const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./auth-model');

const { uniqueUsername, checkBody, checkValidUsername } = require('./auth-middleware')
const buildToken = require('./token-builder')


router.post('/register', checkBody, uniqueUsername, async (req, res, next) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;
  try {
    const newUser = await Users.add(user);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post('/login', checkBody, checkValidUsername, async (req, res, next) => {
  const valid = bcrypt.compareSync(req.body.password, req.user.password)
  if (!valid) {
    next({status: 404, message: "invalid credentials"})
  } else {
    const token = buildToken(req.user)
    res.status(200).json({message: `welcome, ${req.user.username}`, token})
  }
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
