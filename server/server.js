const express       = require('express');
const passport      = require('passport');
const bcrypt        = require('bcrypt');
const cookieParser  = require('cookie-parser');
const authRoutes    = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const itemRoutes    = require('./routes/items');
const messageRoutes = require('./routes/messages');
const analyticsRoutes    = require('./routes/analytics');
const cors          = require('cors');
const app           = express();
const User          = require('./models/user.model');
const session       = require('express-session');
const MongoStore    = require('connect-mongo');
const mongoose      = require('mongoose');
const connection    = require('./db-config');
const upload        = require('./routes/upload');
const { Server }    = require('socket.io')
const initializePassport = require('./passport-config');
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const socketUrl = process.env.NODE_ENV !== "production" ? 'http://localhost:3000' : "https://penn-thrift.herokuapp.com"





app.use(cookieParser())



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
        mongoUrl:process.env.DATABASE_ACCESS,
        collectionName:'userSessions'
    })
}));





app.use(express.urlencoded({extended:true}));

app.use(express.json());
app.use(cors({
    credentials: true,
}));

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
//app.use('/api/messages', messageRoutes)


//initialization variables
const port = process.env.PORT || 4000;
const website   = process.env.WEBSITE || 'http://localhost';
const server  = require('http').Server(app);







//socket.io inititializtion for messages
const io = require('socket.io')(server,{
    // Specifying CORS 
    cors: {
        origin: socketUrl,
        
    }
   })
require('./routes/messages')(io);


//start server

server.listen(process.env.PORT || port,() => console.log(`server is running on ${website}:${port}`));