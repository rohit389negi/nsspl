const express = require('express')
const mongoose = require('mongoose')
const app = express()
const route = require('./routes/route')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/rohitnegi?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3000, function(){
    console.log('express running on server ' + (process.env.PORT || 3000))
})
