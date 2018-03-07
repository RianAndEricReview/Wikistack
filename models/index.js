const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
})

const Page = db.define('page', {
  title: { type: Sequelize.STRING, allowNull: false },
  urlTitle: { type: Sequelize.STRING },
  content: { type: Sequelize.TEXT },
  status: { type: Sequelize.ENUM('open', 'closed')},
  date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
}, {
  getterMethods: {
    route() {
      return `/wiki/${this.getDataValue('urlTitle')}`
    }
  }
})

const User = db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false }
})

const makeURL = (title) => {
  return title ? title.replace(/\s/g, '_').replace(/\W/g, '') : Math.random().toString(36).substring(2, 7);
}

module.exports = {
  Page,
  User,
  db,
}
