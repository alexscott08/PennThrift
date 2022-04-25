const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    description: {
        type: String,
        required: true,
        maxLength: 100,
    },
    categories: [String],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    requests_for: [{type: Schema.Types.ObjectId, ref: 'Request'}],
    to_sell: {
        type: Boolean,
        required: true,
    },
    to_trade: {
        type: Boolean,
        required: true,
    },
    available: Boolean,
}, { collection: 'Item' });

module.exports = mongoose.model('Item', itemSchema);