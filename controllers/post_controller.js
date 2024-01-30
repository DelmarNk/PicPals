const express = require('express')
const router = express.Router
const Post = require('../models/Post')

router.use(express.urlencoded({extended: false}))




