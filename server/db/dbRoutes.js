const { User } = require('./db')

const dbTest = (req, res) => {
  console.log(req.body)
  User.sync({force: true})
    .then(() => {
      return User.create({
        email: req.body.email,
        password: req.body.password
      })
    })
    .then(() => {
      return User.findOne({where: {email: 'punch'}})
    })
    .then(user => {
      console.log("\n******\nuser written to DB!!!\n******\n", user)
      // res.send(user)
    })
}

let r = {}
r.body = {
  email: 'punch',
  password: 'zzz'
}

dbTest(r)

module.exports.dbTest = dbTest
