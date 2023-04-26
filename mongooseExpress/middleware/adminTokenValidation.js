// token validator function
const asyncHandler = require('express-async-handler')
const JWT = require('jsonwebtoken');

const adminTokenValidate = asyncHandler(async (req, res, next) => {
    let token
    let authHeader = req.headers.authorization || req.headers.Authorization
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(" ")[1]
        JWT.verify(token, process.env.SECRECT_KEY, (error, decode) => {
            if (error) {
                res.status(401).send({ Message: "User is not authorized" });
            }
            req.user = decode.user
            console.log(decode.user.role)

        })
        if (!token) {
            res.status(401).send({ Message: "User is not authorized or token is missing 18" });
        } else if (req.user.role != 'admin') {
            console.log('some one trying to access admin data')
            res.status(401).send({ message: "add admin role" })
        } else {
            next();
        }

        // next()
    } else {
        res.status(401).send({ Message: "User is not authorized or token is missing 22" });
        // next()
    }
})

module.exports = adminTokenValidate