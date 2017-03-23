const Sequelize = require('sequelize')

const dbUrl = process.env.RDS_CONNECTION_URL || 'postgres://n:hush@localhost/hl_orders'

const db = new Sequelize(dbUrl)

const User = db.define('user', {
  email: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  feeds: Sequelize.JSON
})

module.exports.db = db
module.exports.User = User
