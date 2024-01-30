//We create the user controller to do CRUD on data coming from the user model 
const express = require('express')
const router = express.Router()
const User = require('../models/Post')
router.use(express.json())

router.use(express.urlencoded({extended: false}))

//create CRUD to use data saved in the database
//Read route
router.get('/:id', async(req,res)=>{
    const data = await User.findById(req.params.id)
    res.send(data)
})

//delete route
router.delete('/:id', async(req,res)=>{
    const data = await User.findByIdAndDelete(req.params.id)
    res.send(data)
})
//update
router.put('/:id', async(req,res)=>{
    const data = await User.findByIdAndUpdate(req.params.id, req.body)
    res.send(data)
})

module.exports = router