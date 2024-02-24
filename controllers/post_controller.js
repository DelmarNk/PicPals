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

router.get('/:id', async(req,res)=>{
    const theImage = await Post.findById(req.params.id)
    if(image == undefined){
        next()
    }
    const data = {image: theImage, id: req.params.id}
    res.render('show.ejs, data')
}, (req,res)=>{
    const data = {error: req.error}
    res.status(404).render('404.ejs', data)
}
)

module.exports = router