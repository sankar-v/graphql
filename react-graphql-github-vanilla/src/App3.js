import React, { Component } from "react";
import axios from "axios";
import GithubForm from "./GithubForm";
import OrganizationSelect from "./OrganizationSelect";
const query = require('./Queries.js')

const TITLE = "React GraphQL Github client";

class App extends Component {
  constructor(props) {
    super(props);
    //alert(process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN)
  }

  state = {
    path: "the-road-to-learn-react",
    organization: null,
    errors: null
  };

  componentDidMount() {
    //fetch data
    this.onFetchFromGitHub("the-road-to-learn-react");
  }

  onSubmit = url => {
    //fetch data
    //alert(url);
    if (!url) {
      this.setState({ path: url });
    }
    this.onFetchFromGitHub(this.state.path);
  };

  /*
  onFetchFromGitHub = path => {
    query.getIssuesOfRepository(path)
        .then(queryResult => {
      console.log(queryResult);
      this.setState(resolveIssuesQuery(queryResult));
    });
  };
  */
  onFetchFromGitHub = (organization) => {
        //alert('Inside onFetchGithub');
        query.getRepositoriesForOrganization(organization)
        .then(queryResult =>{
            console.log(queryResult);
            this.setState(query.resolveIssuesQuery(queryResult));
        })
  }

  //when an organization is selected the state value for organization should be set...
  onOrganizationSelect = organization => {
    if (!organization) {
      this.setState({ organization });
    }
  };

  render() {
    const { path, organization, errors } = this.state;
    return (
      <div>
        <h1>{TITLE}</h1>
        <GithubForm onSubmit={this.onSubmit} path={path} />

        <hr />
        {organization ? (
          <OrganizationSelect
            organization={organization}
            errors={errors}
            onOrganizationSelect={this.onOrganizationSelect}
          />
        ) : (
          <p>No information yet ...</p>
        )}
      </div>
    );
  }
}

export default App;
