import React from 'react';

import SearchForm from './SearchForm';
import InfoRow from './InfoRow';
import Table from './Table';
import Pagination from './Pagination'
import { Greeter } from './Greeter'

import { ConversationData, Conversation } from './types/Types'

interface Props { };

interface State {
  start_date: string,
  end_date: string,
  access_token: string,
  data: Conversation[],
  pageCount: number,
  pageIndex: number,
  descending: boolean,
  errors: {},
  boxes: { title: string, count: number }[]
};

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      start_date: '',
      end_date: '',
      access_token: '',
      data: [],
      pageCount: 0,
      pageIndex: 0,
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

  paginationOnChange = (params: { selected: number }) => {
    this.setState({
      ...this.state,
      pageIndex: params.selected
    })
  }

  sortByDate = (d: boolean) => {
    let newArr = this.state.data;

    function sortDesc(a: Conversation, b: Conversation) {
      return (new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1);
    }

    function sortAsc(a: Conversation, b: Conversation) {
      return (new Date(a.date).getTime() < new Date(b.date).getTime() ? -1 : 1);
    }

    if (d) {
      newArr.sort(sortDesc)
    } else {
      newArr.sort(sortAsc)
    }

    this.setState({
      ...this.state,
      data: newArr,
      descending: d
    });
  }

  fetchData = (index: number) => {
    let i = index * 5;
    let chunk = i + 5
    return this.state.data.slice(i, chunk);
  }

  mapMessagesToState = (data: ConversationData) => {
    try {
      let da = data.by_date;
      da.sort((a: { date: string }, b: { date: string }) => {
        return (new Date(a.date).getTime() < new Date(b.date).getTime() ? -1 : 1);
      });

      this.setState({
        pageCount: Math.ceil(data.by_date.length / 5),
        data: da,
        pageIndex: 0,
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
    }
  }

  renderApp = () => {
    if (this.state.data.length < 1) {
      return (
        <React.Fragment>
          <SearchForm
            sendData={this.mapMessagesToState}
          />
          <Greeter />
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

  render() {
    return (
      <div>
        {this.renderApp()}
      </div>
    );
  }
}

export default App;
