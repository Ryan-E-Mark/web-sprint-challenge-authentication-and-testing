const Users = require('./auth-model');


async function uniqueUsername(req, res, next) {
    const { username } = req.body;
    try {
        const existingUser = await Users.findBy({username})
        if (existingUser) {
            next({status: 400, message: "username taken"});
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
}

function checkBody(req, res, next) {
    const { username, password } = req.body;
    if (!username || username === '' || !password || password === '') {
        next({status: 404, message: "username and password required"});
    } else {
        next();
    }
}

async function checkValidUsername(req, res, next) {
    const { username } = req.body;
    try {
        const existingUser = await Users.findBy({username});
        if (!existingUser) {
            next({status: 400, message: "invalid credentials"});
        } else {
            req.user = existingUser;
            next();
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    uniqueUsername,
    checkBody,
    checkValidUsername,
}