const mongoose = require('mongoose')
const {Schema} = mongoose

const messageSchema = new Schema({
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    chat: {type: mongoose.Schema.Types.ObjectId, ref: 'Chat'},
},{
    timestamps: true,
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message
