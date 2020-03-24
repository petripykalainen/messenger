'use strict';
const data = require('./example.json').by_date;

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Conversations', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Conversations', null, {});
  }
};
