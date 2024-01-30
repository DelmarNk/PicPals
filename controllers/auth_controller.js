const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/login', (req,res)=>{
    res.render('login.ejs')
})

module.exports = router
