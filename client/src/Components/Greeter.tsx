import React from "react"

export const Greeter: React.FC = () => {
  return (
    <div className="jumbotron m-2">
      <h1 className="display-4">Message retrieving application</h1>
      <p className="lead">Enter a date ranger and access token to start looking up data. Press enter on token field to search</p>
    </div>
  );
};
