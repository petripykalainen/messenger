import React from 'react';
import axios from 'axios';

import SearchForm from './SearchForm';
import InfoRow from './InfoRow';
import Table from './Table';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      start_date: '',
      end_date: '',
      access_token: '',
      data: [],
      boxes: [
        {
          title: "Total conversation count",
          count: 0
        },
        {
          title: "Total user message count",
          count: 0
        },
        {
          title: "Total visitor message count",
          count: 0
        },
      ]
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState !== this.state.access_token) {

    }
  }

  fetchMessages = async (data) => {
    try {
      let response =
          await axios.get(`https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${data.sd}&end_date=${data.ed}`, {
        headers: {
          'Authorization': `Token ${data.at}`
        }
      });

      for (var i = 0; i < response.data.by_date.length; i+=5) {
        console.log('start: ', i)
        console.log('end: ', i+5)
        let d = response.data.by_date.slice(i, i+5);
        console.log(d);
      }

      this.setState({
        pageCount: Math.ceil(response.data.by_date.length/5),
        pageIndex: 1,
        data: response.data.by_date,
        boxes: [
          {
            ...this.state.boxes[0],
            count: response.data.total_conversation_count
          },
          {
            ...this.state.boxes[1],
            count: response.data.total_user_message_count
          },
          {
            ...this.state.boxes[2],
            count: response.data.total_visitor_message_count
          }
        ]
      })
    } catch (err) {
      console.log(err)
    }

  }

  render(){
    return (
      <div>
        <SearchForm
          submitForm={this.fetchMessages}
        />
        <InfoRow
          box={this.state.boxes}
        />
        <Table
          data={this.state.data}
        />
      </div>
    );
  }
}

export default App;
