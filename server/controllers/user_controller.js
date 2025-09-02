const UserModel = require("../models/Users")


const getAllUsers = async (req, res) => {

    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (error) {
        console.log('get user error');

    }
}

const createUser = async (req, res) => {

    try {
        const user = await UserModel.create(req.body);
        res.json({ message: 'User Added successfully', user });
    } catch (error) {
        console.log('create user error');

    }
}

const updateUser = async (req, res) => {

    try {
        const id = req.params.id;
        const updatedUser = await UserModel.findByIdAndUpdate(
            { _id: id },
            {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                message: req.body.message
            })
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.log('update user error');

    }
}

const deleteUser = async (req, res) => {

    try {
        const id = req.params.id;
        await UserModel.findByIdAndDelete({ _id: id });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log('delete user error');

    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}
