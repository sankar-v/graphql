import React, { Component } from "react";
import { EventEmitter } from "events";


class GithubForm extends Component {
  constructor(props) {
    super(props);
    this.url = "https://github.com/";
  }

  state = {
    path: this.props.path,
  };

  onChange = evt => {
    const target = evt.target;
    const name = target.name;
    const val = target.value;

    if (!val) {
      this.setState({ path: val });
    }
  };

  onSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit(this.url + this.state.path);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="url">Show open issues for https://github.com/</label>
        <input
          id="url"
          type="text"
          onChange={this.onChange}
          style={{ width: "300px" }}
          value = {this.state.path}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
export default GithubForm;