const mongoose = require('mongoose')
const {Schema} = mongoose;

const chatSchema = new Schema({
    user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

chatSchema.virtual('messages',{
    ref: 'Message',
    localField: '_id',
    foreignField: 'chat'
});

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat