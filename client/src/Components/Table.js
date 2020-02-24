import React from 'react';

function renderTableRow(data) {
  return data.map((data, i) => {
    let date = formatDate(data.date);
    return(
      <tr key={i}>
        <td>{data.conversation_count}</td>
        <td>{data.missed_chat_count}</td>
        <td>{data.visitors_with_conversation_count}</td>
        <td>{date.d} {date.m} <span className="text-muted">({date.y})</span></td>
      </tr>
    )
  })
}

function formatDate(datestring){
  let t = new Date(datestring)
  
  let date = {
    d: t.getDate(),
    m: t.toLocaleString("default", {month: 'short'}),
    y: t.getFullYear()
  }

  return date;
}

const Table = ({data}) => {
  console.log(data)
  return(
    <div className="table-responsive my-2">
      <table className="table">
        <thead className="bg-light">
          <tr>
            <th scope="col">conversation count</th>
            <th scope="col">missed chat count</th>
            <th scope="col">visitors with conversations count</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRow(data)}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
