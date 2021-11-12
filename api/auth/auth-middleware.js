const Users = require('./auth-model')


// middleware for unique username
async function uniqueUsername(req, res, next) {
    const { username } = req.body
    try {
        const existingUser = await Users.findBy({username})
        if (existingUser) {
            next({status: 400, message: "username taken"})
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

// middleware for body containing pword & username
function checkBody(req, res, next) {
    const { username, password } = req.body
    if (!username || username === '' || !password || password === '') {
        next({status: 404, message: "username and password required"})
    } else {
        next()
    }
}


// middleware for valid pword & username? or just username, 
async function checkValidBody(req, res, next) {
    try {

    } catch (err) {
        next(err)
    }
}


module.exports = {
    uniqueUsername,
    checkBody,
    checkValidBody,
}