const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('./db_connection')
//require the .env file to express to make connection between the 2 files
require('dotenv').config()
// to get variable from .env we use process.env.name
const PORT = process.env.PORT
const app = express()
const auth_controller = require('./controllers/auth_controller')
const user_controller = require('./controllers/user_controller')
const post_controller = require('./controllers/post_controller')
const chat_controller = require('./controllers/chat_controller')

app.use(session({
    store: MongoStore.create({mongoUrl: process.env.MONGODB_CONNECTION}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
}))

app.set('view_engine', 'ejs')
app.use(express.static('public'))
app.use('/', auth_controller)
app.use('/profile', user_controller)
app.use('/post', post_controller)
app.use('/chat', chat_controller)

app.get('/', (req,res)=>{
    res.redirect('/login')
})

app.get('/*', (req,res)=>{
    res.render('404.ejs')
})



const server = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})
const io = require('socket.io')(server)

io.on('connection', (socket)=>{
    socket.on('chat message', (msg)=>{
        io.emit('chat message', msg)
    })
})