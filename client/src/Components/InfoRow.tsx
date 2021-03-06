import React from 'react';

interface InfoRowProps {
  box: {
    title: string,
    count: number
  }[]
}

const InfoRow: React.FC<InfoRowProps> = ({ box }) => {
  if (box) {
    const boxes = box.map(({ title, count }) => {
      const style = { height: "14rem" }
      return (
        <div key={title} className="col-md text-center my-auto">
          <div className="card card-block d-flex p-0" style={style}>
            <div className="my-auto card-body">
              <div
                className="card-body align-items-center d-flex justify-content-center">
                <h1 className="card-title">{count}</h1>
              </div>
              <h3 className="font-weight-bold card-text">{title}</h3>
            </div>

          </div>
        </div>
      );
    })
    return (
      <div className="row">
        {boxes}
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col">
      </div>
    </div>
  )

}

export default InfoRow;
