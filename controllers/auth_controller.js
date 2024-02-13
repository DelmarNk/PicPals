const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.use(express.urlencoded({extended: false}))

router.get('/login', (req,res)=>{
    res.render('login.ejs')
})

router.get('/register', (req,res)=>{
    res.render('register.ejs')
})

router.post('/register', async(req,res)=>{
    const userExists = await User.exists({email: req.body.email})
    console.log(req.body)
    if(userExists){
        return res.send('This email is already used, please <a href="/login">login Here</a>')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)

    req.body.password = hash
    const newUser = await User.create(req.body)

    res.redirect('/login')
})

router.post('/login', async(req,res)=>{
    const foundUser = await User.findOne({email: req.body.email}) //find whether the user's email exists in the database 
    //if the user not found, 
    if(!foundUser){
        return res.redirect('/register')
    }
    //if user found, compare passwords
    const passwordMatch = await bcrypt.compare(req.body.password, foundUser.password)
    if(!passwordMatch){
        return res.send('Invalid Password')
    }
    //if the password matches, create a session(with a session,we can save the user's id number in a cookie)
    req.session.currentUser = {
        id: foundUser._id,
        username: foundUser.username
    } 
    return res.redirect(`/profile/${foundUser._id}`)
})

router.get('/logout', async(req,res)=>{
    await req.session.destroy()
    return res.redirect('/login')
})

module.exports = router
