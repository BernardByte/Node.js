
const User = require('../models/userModel')

const createUser = async (req, res) => {
    //let email = req.body.email // use it in form encoded or json (raw) data
    let _email = req.body.email
    try {
        let userExist = await User.findOne({ email: _email })
        if (!userExist) {
            let user = await User.create(req.body)
            res.status(200).json(user);
        }
        else {
            res.status(409).send({ Message: "User already Exist!" })
        }
    } catch (error) {
        console.log(error)
    }
}

const getUsers = async (req, res) => {
    try {
        let users = await User.find({})
        res.status(200).json(users);
    } catch (error) {
        res.status(404).send({ Message: "404 - Data Not Found." })
        console.log("Error goes here: ", error)

    }

}

const updateUser = async (req, res) => {
    //let _email = req.body.email // use it in form encoded or json (raw) data
    let userId = req.params.id
    let { email, password } = req.body
    console.log("Email: ", email, "\nUser id: ", userId)
    const updateData = { email: email, password: password }
    try {
        let userExist = await User.findById({ _id: userId })
        console.log(userExist)
        if (userExist) {
            await User.findByIdAndUpdate({ _id: userId }, updateData)
            let updatdUser = await User.findOne({ _id: userId })
            res.status(200).json(updatdUser);
        }
        else {
            res.status(404).send({ Message: "User does not Exist" })
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        let userId = req.params.id
        let userExist = await User.findOne({ _id: userId })
        if (userExist) {
            await User.findByIdAndDelete({ _id: userId })
            res.status(200).json({ Message: "User deleted successfully!" })
        } else {
            res.status(404).json({ Message: "404 - User Not Found!" })
            console.log("404 - User Not Found")
        }
    } catch (error) {
        console.log("Error in Deletion: ", error)
    }
}



module.exports = { createUser, getUsers, updateUser, deleteUser }