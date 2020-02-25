import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

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

  fetchMessages = async (data) => {
    try {
      let response =
          await axios.get(`https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${data.sd}&end_date=${data.ed}`, {
            headers: {
              'Authorization': `Token ${data.at}`
            }
          });

      let da = response.data.by_date;
      da.sort((a,b) => {
        return (new Date(a.date).getTime() < new Date(b.date).getTime() ? -1 : 1);
      });

      this.setState({
        pageCount: Math.ceil(response.data.by_date.length/5),
        pageIndex: 0,
        data: da,
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
      let code = parseInt(err.message.split(' ').pop());
      let errors = {};
      if (code === 400) {
        // Not found!
        console.log('Not found!')
      }
      if (code === 401) {
        // Unauthorized!
        errors.access_token = 'Invalid access token!'
        this.setState({
          errors
        })        
        console.log('Unauthorized!')
        localStorage.clear();
      }
    }
  }

  render(){
    let table;
    if (this.state.data.length < 1) {
      table = <Table descending={this.state.descending} sortByDate={this.sortByDate}/>
    } else {
      table = (<Table 
                 descending={this.state.descending}
                 data={
                   this.fetchData(this.state.pageIndex)
                 }
                 sortByDate={this.sortByDate}
                   />)
    }
    return (
      <div>
        <SearchForm
          errors={this.state.errors}
          submitForm={this.fetchMessages}
        />
        <InfoRow
          box={this.state.boxes}
        />
        {table}
        <ReactPaginate
          pageCount={this.state.pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          previousLabel={
            <React.Fragment>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </React.Fragment>
          }
          nextLabel={
            <React.Fragment>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Previous</span>
            </React.Fragment>
          }
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          activeClassName={'active'}
          activeLinkClassName={'active'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          onPageChange={this.paginationOnChange}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          disabledClassName={'disabled'}
        />
      </div>

    );
  }
}

export default App;
