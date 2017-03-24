const LocalStrategy = require('passport-local').Strategy
const { User, genHash, validPass } = require('./db')

module.exports = (passport) => {
  console.log('passport module initialised')
  passport.serializeUser((user, done) => {
    done(null, user.email)
  })

  passport.deserializeUser((email, done) => {
    User.findOne({where: {email: email}})
      .then(user => {
        done(null, user)
      })
      .catch(err => {
        done(err, null)
      })
  })

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    User.findOne({where: {email: email}})
      .then(user => {
        if (!user) return done(null, false, req.flash('loginMessage', 'Incorrect username or password'))
        if (!validPass(password, user.password)) {
          return done(null, false, req.flash('loginMessage', 'Incorrect username or password'))
        } else {
          return done(null, user)
        }
      })
      .catch(err => {
        return done(err)
      })
  }))

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    User.findOne({where: {email: email}})
      .then(user => {
        if (user) {
          console.log('it thinks it found a user')
          return done(null, false, req.flash('signupMessage', 'That email address is already in use'))
        } else {
          User.create({
            email: email,
            password: genHash(password)
          })
          .then(user => {
            return done(null, user)
          })
        }
      })
      .catch(err => {
        return done(err)
      })
  }))
}
