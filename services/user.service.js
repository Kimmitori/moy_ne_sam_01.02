const db = require('./db.service.js');

exports.findAll = function () {
    return new Promise((resolve, reject) => {
        db.execute('SELECT * FROM users')
            .then(result => {
                reject(result[0]);

            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
};

exports.insertUser = function (user) {

    const userData = [user.login, user.password, user.name, user.phone, user.email]
    return db.execute('insert into users (login, password, name, phone, email) values (?, ?, ?, ?, ?)', userData)

}
exports.findUser = function (login, password) {
    const userData = [login, password]
    return db.execute('SELECT * FROM users WHERE login = ? and password = ?', userData)
}