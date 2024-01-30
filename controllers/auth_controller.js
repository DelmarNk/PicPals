const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/login', (req,res)=>{
    res.render('login.ejs')
})

router.get('/register', (req,res)=>{
    res.render('register.ejs')
})

router.post('/register', async(req,res)=>{
    const userExists = await User.exists({email: req.body.email})

    if(userExists){
        res.send('This email is already used, please <a href="/login">login Here</a>')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)

    req.body.password = hash
    const newUser = await this.unsubscribe.create(req.body)

    res.redirect('/login')
})

module.exports = router
