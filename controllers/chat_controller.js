const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Chat = require('../models/Chat')
const Message = require('../models/Message')
router.use(express.json())

router.get('/:id', async(req,res)=>{
    let chat = await Chat.findOne().all('users', [req.params.id, req.session.currentUser.id])
    if(!chat){
        chat = await Chat.create({users: [req.params.id, req.session.currentUser.id]})
    }
    const profile = await User.findById(req.params.id)
    res.render('chat.ejs', {profile})
})

router.post('/:id', async(req,res)=>{
    req.body['user'] = req.session.currentUser.id
    await Message.create(req.body)
    res.redirect('/')
})

router.delete('/:id/delete', async(req,res)=>{
    const data = await Message.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router