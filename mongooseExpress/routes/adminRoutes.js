const express = require('express');
const adminRouter = express.Router();
const { adminLogIn, adminUpdate,adminDelete, adminCreate } = require('../controller/adminController')

adminRouter.get('/', adminLogIn)
adminRouter.post('/', adminCreate)
adminRouter.delete('/', adminDelete)

module.exports = adminRouter