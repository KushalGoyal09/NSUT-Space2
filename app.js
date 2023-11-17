const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const signup = require('./routes/signup');
const login = require('./routes/login');
const tweet = require('./routes/tweet');
const home = require('./routes/home')
require('dotenv').config()
const port = process.env.PORT;

// middleware
app.use(cors());

// data parse middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.use('/signup',signup)
app.use('/login',login)
app.use('/tweet',tweet)
app.use('/home',home)

// error handler middleware
app.use(errorHandler)


// not found middleware
app.use(notFound);

const start = async() => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, () => {
            console.log(`Listening to the port ${port}...`);
        })
    } catch (error) {
        console.log(`Error in connecting to a database`);
        console.log(error);
    }
}

start();