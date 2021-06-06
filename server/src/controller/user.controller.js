const UserModel = require('../model/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpException = require('../HttpException.js');
const dotenv = require('dotenv');
dotenv.config();

class UserController {
    getUsers = async (req, res, next) => {

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

        let users = await UserModel.findOne({ id: decoded.id })
        if (!users) {
            throw new Error('Users not found');
        }

        res.send(users);
    }

    isUserAlive = async (req, res, next) => {
        const authHeader = req.headers?.cookie;
        const bearer = 'token=';

        if (!authHeader || !authHeader.startsWith(bearer)) {
            res.send({status: false});
            return
        }

        const token = authHeader.replace(bearer, '');
        const secretKey = process.env.SECRET_JWT

        // Verify Token
        const decoded = jwt.verify(token, secretKey);

        let users = await UserModel.findOne({ id: decoded.id })
        if (!users) {
            res.send({status: false});
            return
        }

        res.send({status: true});
    }

    createUser = async (req, res, next) => {

        await this.hashPassword(req);

        const result = await UserModel.create(req.body)

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send({ message: 'User was created!' });
    };

    userLogin = async (req, res, next) => {

        const { name, password: pass } = req.body;

        const user = await UserModel.findOne({ name });

        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }

        // user matched!
        const secretKey = process.env.SECRET_JWT;
        const token = jwt.sign({ id: user.id.toString() }, secretKey, {
            expiresIn: '5h'
        });

        const { password, ...userWithoutPassword } = user;
        res.cookie('token', token, { httpOnly: true });
        res.send({ ...userWithoutPassword, token });
    };

    userLogOut = async(req, res, next) => {
        //res.cookie('token', token, { httpOnly: true });
        //cookies.set('testtoken', {expires: Date.now()});
        res.clearCookie('token');
        res.send({message: 'Logout succesful!'})
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}

module.exports = new UserController;