'use strict';
const moment = require('moment')
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    visitors_with_conversation_count: DataTypes.INTEGER,
    visitors_affected_by_chat_count: DataTypes.INTEGER,
    visitors_autosuggested_count: DataTypes.INTEGER,
    visitors_with_chat_count: DataTypes.INTEGER,
    chats_from_autosuggest_count: DataTypes.INTEGER,
    chats_from_user_count: DataTypes.INTEGER,
    chats_from_visitor_count: DataTypes.INTEGER,
    conversation_count: DataTypes.INTEGER,
    user_message_count: DataTypes.INTEGER,
    visitor_message_count: DataTypes.INTEGER,
    missed_chat_count: DataTypes.INTEGER,
    date: {
      type:DataTypes.DATEONLY,
      get: function() {
        return moment.utc(this.getDataValue('date')).format('YYYY-MM-DD');
      }
    }
  }, {
    timestamps:false
  });
  Conversation.associate = function(models) {
    // associations can be defined here
  };
  return Conversation;
};
