const pgp = require("pg-promise")();
//const db = pgp("hansken.db.elephantsql.com/xbjrboem");
//const db = pgp("postgres://localhost:5432/xbjrboem");
//const db = pgp("postgres://localhost:5432/accounts");

function checkForUser(email) {
    return db.oneOrNone(
        "SELECT email, password, id FROM users WHERE email = $1", [email]
    );
}

function createUser(email, password, first_name, last_name) {
    return db.none("INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)", [
        email,
        password,
        first_name,
        last_name
    ]);
}

module.exports = {
    checkForUser: checkForUser,
    createUser: createUser
};