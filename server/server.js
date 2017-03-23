const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
require('dotenv').config({path: './config/cf.env'})
// const dbRoutes = require('./db/dbRoutes')
let app = express()

let port = process.env.PORT || 3000

console.log(process.env.TEST)

app
  .use(express.static(path.join(__dirname, '../client')))
  .use(bodyParser.json())
  .use(session({
    secret: 'AxlotlBadgerstone',
    resave: false,
    saveUninitialized: true
  }))
  .get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
  })
  .listen(port, () => { console.log(`Server listening on ${port}`) })
