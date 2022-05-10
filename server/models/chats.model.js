const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatsSchema = new Schema({
    owner:[{type: Schema.Types.ObjectId, ref: 'User'}],
    chats:[{type: Schema.Types.ObjectId, ref: 'Messages'}]
    
}, { collection: 'Chats' });

module.exports = mongoose.model('Chats', chatsSchema)