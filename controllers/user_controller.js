//We create the user controller to do CRUD on data coming from the user model 
const express = require('express')
const router = express.Router()
const User = require('../models/User')
router.use(express.json())

router.use(express.urlencoded({extended: false}))

//create CRUD to use data saved in the database
//Read route
router.get('/:id', async(req,res)=>{
    const data = await User.findById(req.params.id).populate({path: 'posts', options: {sort: {"createdAt": -1}}})
    res.render('profile.ejs', {profile: data, id: req.session.currentUser.id})
})

//delete route
router.delete('/:id', async(req,res)=>{
    const data = await User.findByIdAndDelete(req.params.id)
    res.redirect('/profile')
})
//update
router.put('/:id', async(req,res)=>{
    const data = await User.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/profile')
})

module.exports = router