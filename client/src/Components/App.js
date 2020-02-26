import React from 'react';

import SearchForm from './SearchForm';
import InfoRow from './InfoRow';
import Table from './Table';
import Pagination from './Pagination'
import Greeter from './Greeter'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      start_date: '',
      end_date: '',
      access_token: '',
      data: [],
      pageIndex: 1,
      descending: false,
      errors: {},
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

  paginationOnChange = (params) => {
    this.setState({
      pageIndex: params.selected
    })
  }

  sortByDate = (d) => {
    let newArr = this.state.data;

    // let arr = [2,1,3,10,5,9,8,7,6,4];

    // arr.sort((a,b) => {
    // return (a>b?-1:1);
    // })

    // console.log(arr)

    if (d) {
      newArr.sort(sortDesc)
    } else {
      newArr.sort(sortAsc)
    }

    function sortDesc(a,b){
      return (new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1);
    }
    function sortAsc(a,b){
      return (new Date(a.date).getTime() < new Date(b.date).getTime() ? -1 : 1);
    }

    this.setState({
      data: newArr,
      descending: d
    });
  }

  fetchData = (index) => {
    let i = index*5;
    let chunk = i+5
    return this.state.data.slice(i, chunk);
  }

  mapMessagesToState = (data) => {
    try {
      let da = data.by_date;
      da.sort((a,b) => {
        return (new Date(a.date).getTime() < new Date(b.date).getTime() ? -1 : 1);
      });

      this.setState({
        pageCount: Math.ceil(data.by_date.length/5),
        pageIndex: 0,
        data: da,
        boxes: [
          {
            ...this.state.boxes[0],
            count: data.total_conversation_count
          },
          {
            ...this.state.boxes[1],
            count: data.total_user_message_count
          },
          {
            ...this.state.boxes[2],
            count: data.total_visitor_message_count
          }
        ]
      })
    } catch (err) {
      console.log(err)
    }
  }

  renderApp = (array) => {
    if (array.length < 1) {
      return (
      <React.Fragment>
        <SearchForm
          sendData={this.mapMessagesToState}
        />
        <Greeter/>
      </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <SearchForm
          sendData={this.mapMessagesToState}
        />
        <InfoRow
          box={this.state.boxes}
        />
        <Table
          descending={this.state.descending}
          data={
            this.fetchData(this.state.pageIndex)
          }
          sortByDate={this.sortByDate}
        />
        <Pagination
          paginationOnChange={this.paginationOnChange}
          pageCount={this.state.pageCount}
        />
      </React.Fragment>
    );
  }

  render(){
    // let table;

    // if (this.state.data.length < 1) {
    //   table = <Table descending={this.state.descending} sortByDate={this.sortByDate}/>
    // } else {
    //   table = ()
    // }

    return (
      <div>
        {/* <SearchForm */}
        {/*   sendData={this.mapMessagesToState} */}
        {/* /> */}
        {/* <Greeter/> */}
        {/* <InfoRow */}
        {/*   box={this.state.boxes} */}
        {/* /> */}
        {/* {table} */}
        {/* <Pagination */}
        {/*   paginationOnChange={this.paginationOnChange} */}
        {/*   pageCount={this.state.pageCount} */}
        {/* /> */}
        {this.renderApp(this.state.data)}
      </div>
    );
  }
}

export default App;
