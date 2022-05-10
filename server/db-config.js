const mongoose = require('mongoose');
const path = require('path')
//require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
require('dotenv').config();

var tempDBAccess = "mongodb+srv://pennthrift:A0NQwsElYopLKt97@pennthriftbackend.stiff.mongodb.net/PennThriftBackend?retryWrites=true&w=majority"

const conn = mongoose.connect(tempDBAccess, () => console.log('Database connected'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = conn;