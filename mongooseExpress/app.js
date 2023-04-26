require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db')
const adminRouter = require('./routes/adminRoutes');
const userRouter = require('./routes/userRoutes');
const adminTokenValidate = require('./middleware/adminTokenValidation');

connectDB();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000

// user routes 
app.use('/user', adminTokenValidate,userRouter)
app.use('/admin',adminRouter)






app.listen(port, () => {
    console.log(`server running on port ${port}!`)
})