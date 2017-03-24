module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('index.ejs')
  })

  app.get('/signup', (req, res) => {
    res.render('signup.ejs', {message: ''})
  })

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: 'signup',
    failureFlash: true
  }))

  app.get('/login', (req, res) => {
    res.render('login.ejs', {message: ''})
  })

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/profile', isLoggedIn, (req, res) => {
    console.log('request object on way to profile page:', req)
    res.render('profile.ejs', {
      user: req.user
    })
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}
