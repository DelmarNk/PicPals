const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Chat = require('../models/Chat')
const Message = require('../models/Message')
router.use(express.json())

router.use(express.urlencoded({extended: false}))

router.get('/all', async(req,res)=>{
    let chats = await Chat.find().all('users', [req.session.currentUser.id])
    //find which id is not the user's
    //take that id and get that user's info
    let messageData = []
    for(let i=0; i<chats.length; i++){
        let newMessage = {}
        let profile = null
        if(chats[i].users[0] == req.session.currentUser.id){
            profile = await User.findById(chats[i].users[1])
        }else{
            profile = await User.findById(chats[i].users[0])
        } 
        newMessage.id = profile._id
        newMessage.username = profile.username
        newMessage.photo = profile.photo
        newMessage.message = await Message.find({'chat': chats[i]._id}).sort({'createdAt': -1}).limit(1)
        messageData.push(newMessage)
    }
    res.render('messages.ejs', {messageData, id: req.session.currentUser.id}) //here we're sending messageData to message.ejs and use
})

router.get('/:id', async(req,res)=>{
    let chat = await Chat.findOne().all('users', [req.params.id, req.session.currentUser.id]).populate('messages')
    if(!chat){
        chat = await Chat.create({users: [req.params.id, req.session.currentUser.id]})
    }
    const profile = await User.findById(req.params.id)
    res.render('chat.ejs', {profile, chat, userId: req.session.currentUser.id})
})

router.post('/:id', async(req,res)=>{
    req.body['chat'] = req.params.id
    req.body['user'] = req.session.currentUser.id
    const message = await Message.create(req.body)
})

router.delete('/:id/delete', async(req,res)=>{
    const data = await Message.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router