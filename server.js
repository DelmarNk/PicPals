const express = require('express')
require('./db_connection')
//require the .env file to express to make connection between the 2 files
require('dotenv').config()
// to get variable from .env we use process.env.name
const PORT = process.env.PORT
const app = express()

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})