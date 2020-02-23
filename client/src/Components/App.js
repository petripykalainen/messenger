import React from 'react';

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
          count: 1233
        },
        {
          title: "Total user message count",
          count: 43211
        },
        {
          title: "Total visitor message count",
          count: 32223
        },
      ]
    }
  }

  componentDidMount(){
    console.log('Component did mount!')
    // Try Read local storage and do get request
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState !== this.state.access_token) {
      this.isValidDate(this.state.start_date)
      console.log('Old: ', prevState.start_date)
      console.log('New: ', this.state.start_date)
    }
  }

  isValidDate(datestring) {
    if (/\d{4}-\d{2}-\d{2}/.test(datestring)) {
      console.log('DATE VALID!')
    }
    // console.log('split string 1: ', date[0]);
    // console.log('split string 2: ', date[1]);
    // console.log('split string 3: ', date[3]);
  }
  
  setValue = (e) => {
    console.log(e.value);
    this.setState({ 
      [e.name]: e.value 
    })
  }

  render(){
    return (
      <div>
        <SearchForm 
          handleInput={this.setValue}
        />
        <InfoRow
          box={this.state.boxes}
        />
      </div>
    );
  }
}

export default App;
