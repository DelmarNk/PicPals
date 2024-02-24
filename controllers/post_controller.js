const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')

router.use(express.json())
router.use(express.urlencoded({extended: false}))

router.get('/',async (req,res)=>{
    const data = await Post.find({}).sort({createdAt: -1}).populate("user")
    res.render('feed.ejs', {
        posts: data,
        id: req.session.currentUser.id
    })
})

router.get('/new', (req,res)=>{
    res.render('new.ejs', {id:req.session.currentUser.id})
})

router.post('/new', async(req,res)=>{
    req.body['user'] = req.session.currentUser.id
    await Post.create(req.body)
    res.redirect('/post')
})

router.get('/:id/edit', async(req,res)=>{
    const allPosts = await Post.findById(req.params.id)
    const data = {post: allPosts, id: req.params.id}
    res.render('edit.ejs', data)
})

router.delete('/:id/delete', async(req,res)=>{
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/post')
})

module.exports = router