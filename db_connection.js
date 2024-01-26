const mongoose = require('mongoose')

require('dotenv').config()
mongoose.connect(process.env.MONGODB_CONNECTION)
.then(()=>{
    console.log('come get your mangos')
})
.catch((error)=>{
    console.log(`No mangos ${error}`)
})