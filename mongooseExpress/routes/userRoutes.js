const express = require('express');
const userRouter = express.Router()
// const tokenValidate = require('../middleware/adminTokenValidation');

const {
    createUser,
    getUsers,
    updateUser,
    deleteUser
} = require('../controller/userController');

userRouter.get('/', getUsers)
userRouter.post('/',createUser)
userRouter.put('/:id',updateUser)
userRouter.delete('/:id',deleteUser)
module.exports = userRouter