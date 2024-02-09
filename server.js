const express = require('express')
require('./db_connection')
//require the .env file to express to make connection between the 2 files
require('dotenv').config()
// to get variable from .env we use process.env.name
const PORT = process.env.PORT
const app = express()
const auth_controller = require('./controllers/auth_controller')
const user_controller = require('./controllers/user_controller')
const post_controller = require('./controllers/post_controller')

app.set('view_engine', 'ejs')
app.use(express.static('public'))
app.use('/', auth_controller)
app.use('/profile', user_controller)
app.use('/post', post_controller)




app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})