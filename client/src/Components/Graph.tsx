import React from 'react';
import { Line } from 'react-chartjs-2';
import { Conversation } from './types/Types'

interface Data {
  label: string,
  backgroundColor: string,
  data: number[]
}

interface ChartProps {
  data: Conversation[],
}

interface ChartState {
  data: {
    labels: string[],
    datasets: Data[],
  }
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

const chartData = (data: Conversation[]) => {
  return {
    labels: generateLabels(data),
    datasets: [
      {
        label: 'conversation count',
        backgroundColor: 'rgba(255,128,0,0.2)',
        // fill: false,
        borderColor: 'red',
        data: generateData(data, "conversation_count"),

      },
      {
        label: 'missed chat count',
        backgroundColor: 'rgba(0,255,128,0.2)',
        // fill: false,
        borderColor: 'green',
        data: generateData(data, "missed_chat_count"),
      },
      {
        label: 'visitors with conversations count',
        backgroundColor: 'rgba(128,0,255,0.2)',
        // fill: false,
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
      data: chartData(this.props.data)
    }
  }
  render() {
    return (
      <div className="m-2">
        <Line
          data={this.state.data}
        />
      </div>
    )
  }

}

export default Chart;
