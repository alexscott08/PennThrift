const express       = require('express');
const passport      = require('passport');
const bcrypt        = require('bcrypt');
const cookieParser  = require('cookie-parser');
const authRoutes    = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const itemRoutes    = require('./routes/items');
const analyticsRoutes    = require('./routes/analytics');
const cors          = require('cors');
const app           = express();
const User          = require('./models/user.model');
const session       = require('express-session');
const MongoStore    = require('connect-mongo');
const mongoose      = require('mongoose');
const connection    = require('./db-config');
const upload        = require('./routes/upload');
const initializePassport = require('./passport-config');
require('dotenv').config();



app.use(cookieParser())

//temp because error
var tempDBAccess = "mongodb+srv://pennthrift:A0NQwsElYopLKt97@pennthriftbackend.stiff.mongodb.net/PennThriftBackend?retryWrites=true&w=majority"

//app sessions

app.use(session({
    key:'user_sid',
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:600000 // equals six days
    },
    store: MongoStore.create({
        mongoUrl:tempDBAccess,
        collectionName:'userSessions'
    })
}));



app.use(express.urlencoded({extended:false}));

app.use(express.json());
app.use(cors());

//Passport

initializePassport(passport, username => {
    User.find(user => user.username === username)
});

app.use(passport.initialize());
app.use(passport.session());



//routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/file', upload);
app.use('/api/analytics', analyticsRoutes);

//start server
const port = process.env.PORT || 4000;
const website   = process.env.WEBSITE || 'http://localhost';
// app.listen(port,() => console.log(`server is running on ${website}:${port}`));

module.exports = app;