import React from 'react';

class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      start_date: "",
      end_date: "",
      access_token: ""
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.props.handleInput(event.target);
  }

  render() {
    return (
      <div className="my-3">
        <form>
          <div className="form-row">
            <div className="navbar-brand col">
              <label>Start date </label>
              <input 
                className="form-control form-control-lg" 
                name="start_date"
                value={this.state.start_date}
                onChange={e => this.handleInputChange(e)}
                type="text"
                required pattern="\d{4}-\d{2}-\d{2}"
              />
            </div>
            <div className="navbar-brand col">
              <label>End date </label>
              <input 
                className="form-control form-control-lg"
                name="end_date"
                value={this.state.end_date}
                onChange={e => this.handleInputChange(e)}
                type="text"
                required pattern="\d{4}-\d{2}-\d{2}"
              />
            </div>
            <div className="navbar-brand col-md">
              <label className="invisible">token</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <i className="input-group-text material-icons">person</i>
                </div>
                <input 
                  className="form-control form-control-lg" 
                  name="access_token"
                  value={this.state.access_token}
                  onChange={e => this.handleInputChange(e)}
                  type="text"/>
              </div>
            </div>
          </div>
        </form>
      </div>
    );  
  }
  
}

export default SearchForm;
