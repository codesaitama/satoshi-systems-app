const UserModel = require('../model/user.model.js');

class UserController{
    getUsers = (req, res, next) => {
        console.log({req, res, next})
        let users = UserModel.find();
        console.log(users)
        // if (!users.length) {
        //     throw new Error('Users not found');
        // }

        res.send(users);
    }
}

module.exports = new UserController;