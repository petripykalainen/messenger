import React from 'react';
import _ from 'lodash';
import axios from 'axios'

class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      start_date: "",
      end_date: "",
      access_token: "",
      errors: {}
    }
  }

  componentDidMount(){
    try {
      let data = JSON.parse(localStorage.getItem('userdata'))
      this.setState({
        start_date: data.sd,
        end_date: data.ed,
        access_token: data.at,
      })
    } catch (err) {
    }
  }

  fetchMessages = async (data) => {
    try {
      let response =
          await axios.get(`https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${data.sd}&end_date=${data.ed}`, {
            headers: {
              'Authorization': `Token ${data.at}`
            }
          });
      this.props.sendData(response.data)
    } catch (err) {
      let code = parseInt(err.message.split(' ').pop());
      let errors = {};

      if (code === 400) {
        // Not found!
        errors.data = 'No data found'

      }

      if (code === 401) {
        // Unauthorized!
        errors.access_token = 'Invalid access token!'

      }
      this.setState({
        errors
      })
    }

  }

  handleInputChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value,
      errors: {...this.state.errors, [event.target.name]: ''}
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    let errors = this.dateFormValidation(this.state);

    if (_.isEmpty(errors)) {
      let data = {
        sd: this.state.start_date,
        ed: this.state.end_date,
        at: this.state.access_token,
      }
      localStorage.setItem('userdata', JSON.stringify(data))

      this.fetchMessages(data);
    }
    else
    {

      this.setState({
        ...this.state, errors
      })
    }
  }

  dateFormValidation = (state) => {
    const errors = {};

    if (state.access_token === '') {
      errors.access_token = "Enter valid access token!"
    }

    if (state.start_date === '') {
      errors.start_date = "Set a starting date!"
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(state.start_date) && state.start_date.length > 0) {
      errors.start_date = "Use yyyy-mm-dd format!"
    }
    if (state.end_date === '') {
      errors.end_date = "Set a end date!"
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(state.end_date) && state.end_date.length > 0) {
      errors.end_date = "Use yyyy-mm-dd format!"
    }

    return errors;
  }

  renderError(error){
    if (error) {
      return (
        <div className="mt-1 alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error! </strong>{error }
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="row my-3">
        <div className="col-sm-3 my-1">

          <label>Start date </label>
          <input
            className="form-control form-control-lg"
            name="start_date"
            value={this.state.start_date}
            onChange={e => this.handleInputChange(e)}
            type="text"
          />
          {this.renderError(this.state.errors.start_date)}
        </div>
        <div className="col-sm-3 my-1">
          <label>End date </label>
          <input
            className="form-control form-control-lg"
            name="end_date"
            value={this.state.end_date}
            onChange={e => this.handleInputChange(e)}
            type="text"
          />
          {this.renderError(this.state.errors.end_date)}
        </div>

        <form className="offset-sm-2 col-sm-4" onSubmit={this.handleFormSubmit}>
          <label className="invisible">token</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <i className="input-group-text material-icons">person</i>
            </div>
            <input
              className="form-control form-control-lg"
              type="text"
              name="access_token"
              value={this.state.access_token}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="col">
            {this.renderError(this.state.errors.access_token)}
          </div>
        </form>
      </div>

    );
  }

}

export default SearchForm;
