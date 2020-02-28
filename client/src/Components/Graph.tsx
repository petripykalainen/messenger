import React from 'react';
import { Line } from 'react-chartjs-2';
import { Conversation } from './types/Types'

interface Data {
  labels: string[]
  datasets: {
    label: string,
    backgroundColor: string,
    borderColor: string,
    data: number[]
  }[]
}

interface ChartProps {
  data: Conversation[],
}

interface ChartState {
  conversationData: Conversation[],
  data: Data
}

type ConversationKey = keyof Conversation;

const getProp = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key]
}

const generateLabels = (data: Conversation[]): string[] => {
  return data.map((conversation) => {
    return conversation.date
  })
}

const generateData = (data: Conversation[], key: ConversationKey): any => {
  return data.map((o) => {
    return getProp(o, key)
  })
}

const chartData = (data: Conversation[]): Data => {
  return {
    labels: generateLabels(data),
    datasets: [
      {
        label: 'conversation count',
        backgroundColor: 'rgba(255,128,0,0.2)',
        borderColor: 'red',
        data: generateData(data, "conversation_count"),

      },
      {
        label: 'missed chat count',
        backgroundColor: 'rgba(0,255,128,0.2)',
        borderColor: 'green',
        data: generateData(data, "missed_chat_count"),
      },
      {
        label: 'visitors with conversations count',
        backgroundColor: 'rgba(128,0,255,0.2)',
        borderColor: 'blue',
        data: generateData(data, "visitors_with_conversation_count"),
      }
    ]
  }
}

class Chart extends React.Component<ChartProps, ChartState> {
  constructor(props: ChartProps) {
    super(props)
    this.state = {
      conversationData: this.props.data,
      data: chartData(this.props.data)
    }
  }

  componentDidUpdate() {
    if (this.props.data !== this.state.conversationData) {
      this.setState({
        ...this.state,
        data: chartData(this.props.data),
        conversationData: this.props.data
      })
    }

  }

  render() {
    return (
      <div className="my-4">
        <Line
          data={this.state.data}
        />
      </div>
    )
  }

}

export default Chart;
