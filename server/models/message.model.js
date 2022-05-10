const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    
    messages: Array,
    users: Array
      
},{timestamps:true}, { collection: 'Messages' });

module.exports = mongoose.model('Messages', messageSchema)