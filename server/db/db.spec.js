const { db, User } = require('./db')

let feedlist = {
  text: 'Testfeed',
  title: 'Testfeed',
  type: 'rss',
  xmlUrl: 'http://internev.com/feed/',
  htmlUrl: 'http://internev.com/'
}

test('db record creation', () => {
  return User.sync({force: true})
  .then(() => {
    User.create({
      email: 'test@eagle.com',
      password: 'hush',
      feeds: JSON.stringify(feedlist)
    })
    .then(() => {
      return User.findAll()
    })
    .then(users => {
      expect(users[0].email).toBe('test@eagle.com')
    })
    .then(() =>{
      return User.findOne({email: 'test@eagle.com'})
    })
    .then(user => {
      expect(user.email).toBe('test@eagle.com')
    })
  })
})

//
// describe('db', () => {
//   // let findAllResult, findOneResult
//   User.sync({force: true})
//   .then(() => {
//     User.create({
//       email: 'test@eagle.com',
//       password: 'hush',
//       feeds: JSON.stringify(feedlist)
//     })
//   })
//   .then(() => {
//     User.findAll()
//       .then(users => {
//         // findAllResult = users[0].email
//         it('should write to db', () => {
//           expect(users[0].email).toBe('test@eagle.com')
//         })
//       })
//   })
//   .then(() => {
//     User.findOne({email: 'test@eagle.com'})
//       .then(user => {
//         it('should find one in db', () => {
//           expect(user.email).toBe('test@eagle.com')
//         })
//       })
//   })
//   .then(() => {
//     User.destroy({where: {email: 'test@eagle.com'}})
//   })
//   .then(() => {
//     User.findAll()
//       .then(users => {
//         it('should write to db', () => {
//           expect(users.length).toBe(0)
//         })
//       })
//   })
// })
