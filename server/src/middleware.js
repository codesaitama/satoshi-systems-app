const jwt = require('jsonwebtoken');
const HttpException = require('./HttpException.js');
const UserModel = require('./model/user.model.js')

const dotenv = require('dotenv');
dotenv.config();

const authenticate = (...roles) => {
    return async function (req, res, next) {
        try {
            // const authHeader = req.headers.authorization;
            // const bearer = 'Bearer ';

            // if (!authHeader || !authHeader.startsWith(bearer)) {
            //     throw new HttpException(401, 'Access denied. No credentials sent!');
            // }

            // const token = authHeader.replace(bearer, '');

            const authHeader = req.headers?.cookie;
            const bearer = 'token=';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new HttpException(401, 'Access denied. No credentials sent!');
            }

            const token = authHeader.replace(bearer, '');

            const secretKey = process.env.SECRET_JWT

            // Verify Token
            const decoded = jwt.verify(token, secretKey);
            const user = await UserModel.findOne({ id: decoded.id }) //AdminUserModel.findOne({ id: decoded.id });

            if (!user) {
                throw new HttpException(401, 'Authentication failed!');
            }

            // check if the current user is the owner user
            const ownerAuthorized = decoded.id == user.id;

            // if the current user is not the owner and
            // if the user role don't have the permission to do this action.
            // the user will get this error
            if (!ownerAuthorized) { //  && roles.length && !roles.includes(user.role)
                throw new HttpException(401, 'Unauthorized');
            }

            // if the user has permissions
            req.currentUser = user;
            next();

        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

module.exports = { authenticate }