const db = require('../data/db-config')

module.exports = {
    find,
    findById,
    add,
    findUserPosts,
    update,
    remove,
}

function findUserPosts(userId) {
    /* 
    select p.id
    , p.contents as Quote
    , u.username as Author
    from posts as p
    join users as u
        on p.user_id = u.id
    where user_id = 1;
    */
    return db('posts as p')
        .select('p.id', 'p.contents as Quote', 'u.username as Author')
        .join('users as u', 'p.user_id', 'u.id')
        .where('user_id', userId)
}

function find() {
    return db('users')
}

function findById(id) {
    return db('users').where('id', id).first()
}

function add(user) {
    return db('users').insert(user)
        .then (ids => {
            return findById(ids[0])
        })
}

function update(changes, id) {
    return db('users').where({ id }).update(changes)
    .then(count => {
        return findById(id)
    })
}

function remove(id) {
    return db('users').where({ id }).del()
}