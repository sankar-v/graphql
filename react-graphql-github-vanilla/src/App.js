import React, { Component } from "react";
import Organization from "./Organization";
const query = require('./Queries.js')

const TITLE = "React GraphQL Github client";

class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
    organization: null,
    errors: null,
  };

  componentDidMount() {
    this.onFetchFromGitHub(this.state.path);
  }

  onChange = event => {
    this.setState({ path: event.target.value });
  };

  onFetchFromGitHub = (path, endCursor) => {
    query.getIssuesOfRepository(path,endCursor).then(queryResult =>
      this.setState(query.resolveIssuesQuery(queryResult, endCursor)),
    );
  };

  onFetchMoreIssues = () => {
    const{
      endCursor,
    } = this.state.organization.repository.issues.pageInfo;
    this.onFetchFromGitHub(this.state.path, endCursor);
  }

  onStarRepository = (repositoryId, viewerHasStarred) => {
    query.addStarToRepository(repositoryId)
      .then(mutationResult => 
        this.setState(query.resolvedAddStarMutation(mutationResult)));  
  };

  render() {
    const { path, organization, errors } = this.state;

    return (
      <div>
        <h1>{TITLE}</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">
            Show open issues for https://github.com/
          </label>
          <input
            id="url"
            type="text"
            value={path}
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>

        <hr />

        {organization ? (
          <Organization 
              organization={organization} 
              errors={errors} 
              onFetchMoreIssues={this.onFetchMoreIssues}
              onStarRepository={this.onStarRepository}
              />
        ) : (
          <p>No information yet ...</p>
        )}
      </div>
    );
  }
}

export default App;