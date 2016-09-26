var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack'
                       ,{logging: false}
                       );

// var Page = db.define('page', {
//   title: Sequelize.STRING,
//   urlTitle: {
//     type: Sequelize.STRING,
//     validate: {
//       isUrl: true
//     }
//   },
//   content: Sequelize.TEXT,
//   status: Sequelize.STRING
// })

// var User = db.define('user', {
//   name: Sequelize.STRING,
//   urlTitle: {
//     type: Sequelize.STRING,
//     validate: {
//       isEmail: true
//     }
//   },
// })

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        isUrl: true,

    },
    route: {
          type: Sequelize.VIRTUAL,
          set: function() {
            this.setDataValue('route', '/wiki/' + this.urlTitle)
          }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    }
});

module.exports = {
  Page: Page,
  User: User
};
