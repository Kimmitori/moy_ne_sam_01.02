const { config } = require('../config.js');
const { decrypt } = require('../lib/crypto.js');


exports.authorizationMiddleware = function (request, response, next) {
    const token = request.params.token;
    if (token) {
        try {
            const parsedToken = Buffer.from(token, 'hex');
            const decryptedToken = decrypt(parsedToken);
            const strUtf = decryptedToken.toString('utf8')
            const tokenObj = JSON.parse(strUtf)
            const isExpired = new Date() - new Date(tokenObj.date) > config.timeExpiresAuth
            if (isExpired) {
                response.redirect('/auth/login');
            } else {
                response.locals.userId = tokenObj.userId;
                next();
            }
        } catch (error) {
            response.redirect('/auth/login');
        }
    } else {
        response.redirect('/auth/login');
    }
};