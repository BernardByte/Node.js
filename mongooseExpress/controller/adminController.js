const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken')


const adminLogIn = async (req, res) => {
    let { name, email, password } = req.body
    if (email && password) {
        try {
            let isAdminExist = await Admin.findOne({ email: email, password: password })
            if (isAdminExist) {
                let tokenData = {
                    user: {
                        name: isAdminExist.name,
                        email: email,
                        role: "admin" // this add the fucntionality to check that token belongs to admin
                    }
                }
                const accessToken = jwt.sign(tokenData, process.env.SECRECT_KEY, { expiresIn: "2m" })
                res.status(200).json(accessToken)
            } else {
                res.status(404).send({ Message: "Admin account not exist" })

            }
        } catch (error) {
            console.error("Error: ", error.stack)
        }
    } else {
        res.status(401).send({ Message: "Please provide correct credentials" })
    }
}



const adminCreate = async (req, res) => {
    let adminEmail = req.body.email
    if (adminEmail) {
        try {
            let isAdminExist = await Admin.findOne({ email: adminEmail })
            if (!isAdminExist) {
                let { name, email, password } = req.body
                const adminData = { name: name, email: email, password: password }
                let createAdmin = await Admin.create(adminData)
                res.status(200).json(createAdmin)
            } else {
                res.status(409).json({ Message: "Admin already Exist!" })
            }
        } catch (error) {
            console.error("Error: ", error.stack)
        }
    } else {
        res.send({ Message: "Please provide Name, Email, Password" })
    }
}


const adminUpdate = async (req, res) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.error("Error: ")
    }
}



const adminDelete = async (req, res) => {
    let adminEmail = req.body.email
    if (adminEmail != null) {
        try {
            let isAdminExist = await Admin.findOne({ email: adminEmail })
            if (isAdminExist) {
                await Admin.findOneAndDelete({ email: adminEmail })
                res.status(200).json({ Message: "Admin Deleted." })
            } else {
                res.status(404).json({ Message: "Not Found account against this Email: ", adminEmail })
            }
        } catch (error) {
            console.error("Error: ", error.stack)
        }
    } else {
        res.send({ Message: "provide credentials" })
    }
}

module.exports = { adminLogIn, adminCreate, adminUpdate, adminDelete }