const UserModel = require('../model/user.model.js');

class UserController{
    getUsers = async(req, res, next) => {
        console.log({req, res, next})
        let users = await UserModel.find();
        if (!users.length) {
            throw new HttpException(404, 'Users not found');
        }

        res.send(users);
    }
}

module.exports = new UserController;