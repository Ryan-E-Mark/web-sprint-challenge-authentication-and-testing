const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./auth-model');

const { uniqueUsername, checkBody, checkValidUsername } = require('./auth-middleware');
const buildToken = require('./token-builder');


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
    next({status: 404, message: "invalid credentials"});
  } else {
    const token = buildToken(req.user);
    res.status(200).json({message: `welcome, ${req.user.username}`, token});
  }
});

module.exports = router;
