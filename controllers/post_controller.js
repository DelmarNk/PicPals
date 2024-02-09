const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')

router.use(express.json())
router.use(express.urlencoded({extended: false}))

router.get('/',async (req,res)=>{
    const data = {posts: await Post.find({}).sort({createdAt: -1}).populate("user")}
    res.render('feed.ejs', data)
})

router.get('/new', (req,res)=>{
    res.render('new.ejs')
})

router.post('/', async(req,res)=>{
    await Post.create(req.body)
    res.redirect('/post')
})

router.get('/:id/edit', async(req,res)=>{
    const allPosts = await Post.findById(req.params.id)
    const data = {post: allPosts, id: req.params.id}
    res.render('edit.ejs', data)
})

router.delete('/:id', async(req,res)=>{
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/post')
})

module.exports = router




