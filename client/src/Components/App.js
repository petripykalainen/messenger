import React from 'react';
import axios from 'axios';

import SearchForm from './SearchForm';
import InfoRow from './InfoRow';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      start_date: '',
      end_date: '',
      access_token: '',
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

  componentDidMount(){

  }

  componentDidUpdate(prevProps, prevState){
    if (prevState !== this.state.access_token) {

    }
  }

  // setValue = (e) => {
  //   // console.log(e.value);
  //   this.setState({
  //     [e.name]: e.value
  //   })
  // }

  fetchMessages = async (data) => {
    try {
      let response =
          await axios.get(`https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${data.sd}&end_date=${data.ed}`, {
        headers: {
          'Authorization': `Token ${data.at}`
        }
      });

      this.setState({
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
      </div>
    );
  }
}

export default App;
