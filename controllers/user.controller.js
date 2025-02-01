const userService = require('../services/user.service.js')
const User = require('../models/user.js')
const { encrypt } = require('../lib/crypto.js')

exports.registrationPage = function (request, response) {
    response.render('registration.hbs')
}
exports.loginPage = function (request, response) {
    response.render('login.hbs')
}

exports.usersPage = function (request, response) {
    userService.findAll()
        .then((users) => {
            response.render("users.hbs", { users: users });
        }).catch(function (err) {
            console.log(err)
        })
};

exports.addUser = function (request, response) {
    const userData = request.body
    const user = new User(userData)

    userService.insertUser(user)
        .then(() => {
            console.log('sql-result insert into users - success!')
            response.send('success')
        })
        .catch((error) => {
            console.log('sql-result insert into users - error!')
            console.error(error)

            response.status(500).send(error.sqlMessage)
        })
    
}
exports.authorizeUser = function (request, response) {
    const login = request.body.login;
    const password = request.body.password;
    if (login && password) {

        userService.findUser(login, password)
            .then(function (res) {
                const rowUser = res[0][0]

                if (rowUser) {
                    console.log(rowUser)
                    const user = new User(rowUser);
                    const dataForEncryt = { userId: user.id, date: new Date() };
                    const encrypteBuffer = encrypt(dataForEncryt);
                    const objForFrontented = { token: encrypteBuffer.toString('hex') }

                    response.send(objForFrontented);
                    response.end();

                } else {
                    response.status(401);
                    response.send('Incorrect login and/or Password!');
                }

            })

    } else {
        response.status(401);
        response.send('Incorrect login and/or Password!');
    }

}