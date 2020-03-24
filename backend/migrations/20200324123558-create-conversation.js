'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      visitors_with_conversation_count: {
        type: Sequelize.INTEGER
      },
      visitors_affected_by_chat_count: {
        type: Sequelize.INTEGER
      },
      visitors_autosuggested_count: {
        type: Sequelize.INTEGER
      },
      visitors_with_chat_count: {
        type: Sequelize.INTEGER
      },
      chats_from_autosuggest_count: {
        type: Sequelize.INTEGER
      },
      chats_from_user_count: {
        type: Sequelize.INTEGER
      },
      chats_from_visitor_count: {
        type: Sequelize.INTEGER
      },
      conversation_count: {
        type: Sequelize.INTEGER
      },
      user_message_count: {
        type: Sequelize.INTEGER
      },
      visitor_message_count: {
        type: Sequelize.INTEGER
      },
      missed_chat_count: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Conversations');
  }
};
