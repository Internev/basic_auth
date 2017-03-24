const express = require('express')
// const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan')
const authRoutes = require('./db/authRoutes')

let app = express()
require('dotenv').config({path: './config/cf.env'})
require('./db/passport')(passport)

let port = process.env.PORT || 3000

app
  // .use(express.static(path.join(__dirname, '../client')))
  .use(morgan('dev'))
  .use(cookieParser())
  .use(bodyParser())
  .use(session({
    secret: 'AxlotlBadgerstone',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
      // secure: true
    }
  }))
  .set('view engine', 'ejs')
  .use(passport.initialize())
  .use(passport.session())
  .use(flash())

authRoutes(app, passport)

app
  // .get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
  // })
  .listen(port, () => { console.log(`Server listening on ${port}`) })
