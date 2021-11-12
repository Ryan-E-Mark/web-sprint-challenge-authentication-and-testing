const db = require('../../data/dbConfig')

async function add(user) {
    const [newUser] = await db('users').insert(user)
    return await db('users').where('id', newUser)
}

module.exports = {
    add,
}