const Express = require('express');
const db = require('./../models');
const {Conversation} = db;
const {Op} = require('sequelize')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const moment = require('moment');

require('dotenv').config();

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const app = Express();

// Environment
const port = 5000 || process.env.port;
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cookieParser());

// CORS
const corsOptions = {
  origin: 'http://localhost'
};

app.use(cors(corsOptions));

// Routes

app.get('/api/conversation', async (req, res) => {
  let from, to, token;

  try {
    from = new Date(req.query.from)
    to = new Date(req.query.to)
    if (from === 'Invalid Date' || to === 'Invalid Date') {
      console.log('Invalid dates!')
      return res.json({})
    }
  } catch (err) {
    console.log(err)
    return res.json(err)
  } 

  try {
    const conversations = await db.Conversation.findAll({
      where: {
        date: {
          [Op.between]: [from,to]
        }
      }
    });
    let arr = [];

    conversations.map((conversation) => {
      arr.push(conversation.dataValues)
    })

    console.log(from, to)

    let data = {
      start_date: moment.utc(from).format('YYYY-MM-DD'),
      end_date: moment.utc(to).format('YYYY-MM-DD'),
      total_visitors_with_conversation_count: arr.reduce((a,c) => {
        return a + c.visitors_with_conversation_count;
      },0),
      total_visitors_affected_by_chat_count: arr.reduce((a,c) => {
        return a + c.visitors_affected_by_chat_count;
      },0),
      total_visitors_autosuggested_count: arr.reduce((a,c) => {
        return a + c.visitors_autosuggested_count;
      },0),
      total_visitors_with_chat_count: arr.reduce((a,c) => {
        return a + c.visitors_with_chat_count;
      },0),
      total_chats_from_autosuggest_count: arr.reduce((a,c) => {
        return a + c.chats_from_autosuggest_count;
      },0),
      total_chats_from_user_count: arr.reduce((a,c) => {
        return a + c.chats_from_autosuggest_count;
      },0),
      total_chats_from_visitor_count: arr.reduce((a,c) => {
        return a + c.chats_from_visitor_count;
      },0),
      total_conversation_count: arr.reduce((a,c) => {
        return a + c.conversation_count;
      },0),
      total_user_message_count: arr.reduce((a,c) => {
        return a + c.user_message_count;
      },0),
      total_visitor_message_count: arr.reduce((a,c) => {
        return a + c.visitor_message_count;
      },0),
      total_missed_chat_count: arr.reduce((a,c) => {
        return a + c.missed_chat_count;
      },0),
      by_date: arr
    }
    return res.json(data);
  } catch (err) {
    // console.log(err)
    return res.json(err);
  }
});

app.listen(port, (err, req, res, next) => { 
  if (!err) {
    console.log(`Server running at port ${port}`);
  } else {
    console.log(err)
  }
});
