const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/re-wikistack')

const Page = db.define('page', {
  title: { type: Sequelize.STRING, allowNull: false },
  urlTitle: { type: Sequelize.STRING },
  content: Sequelize.TEXT,
  status: { type: Sequelize.ENUM('open', 'closed'), allowNull: false }
})

const User = db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false }
})

module.exports = {Page, User}
