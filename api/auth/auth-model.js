const db = require('../../data/dbConfig');

async function add(user) {
    const [newUser] = await db('users').insert(user);
    return await db('users').where('id', newUser);
}

async function findBy(filter) {
    const [result] = await db('users').where(filter);
    return result;
}

module.exports = {
    add,
    findBy
}