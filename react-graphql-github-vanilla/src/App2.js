import React, { Component } from "react";
import axios from "axios";
import GithubForm from "./GithubForm";
import OrganizationSelect from "./OrganizationSelect";

const TITLE = "React GraphQL Github client";

class App extends Component {
  constructor(props) {
    super(props);
    //alert(process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN)
  }

  state = {
    path: "the-road-to-learn-react/the-road-to-learn-react",
    organization: null,
    errors: null
  };

  componentDidMount() {
    //fetch data
    this.onFetchFromGitHub(this.state.path);
  }

  onSubmit = url => {
    //fetch data
    //alert(url);
    if (!url) {
      this.setState({ path: url });
    }
    this.onFetchFromGitHub(this.state.path);
  };

  //Initial method..using hard coded repository and organization values
  /*
    onFetchFromGitHub = () => {
        axiosGitHubGraphQL
            .post('', { query: GET_ISSUES_OF_REPOSITORY })
            .then(
                result => 
                {
                console.log(result);
                this.setState(()=>({
                    organization: result.data.data.organization,
                    errors: result.data.errors,
                }))});
    }
    */

  //Parameterizing organization and repository variables and
  //using string interpolation of JavaScript using getIssuesOfRepositoryQuery function
  /*
   onFetchFromGitHub = (path) => {
        const [organization, repository] = path.split('/');
        axiosGitHubGraphQL
            .post('', { query: getIssuesOfRepositoryQuery(organization, repository) })
            .then(
                result => 
                {
                console.log(result);
                this.setState(()=>({
                    organization: result.data.data.organization,
                    errors: result.data.errors,
                }))});
    }
*/

  //abstracting axios call in getIssuesOfRepository and returning
  //a Promise
  /*
  onFetchFromGitHub = path => {
    getIssuesOfRepository(path).then(result => {
      console.log(result);
      this.setState(() => ({
        organization: result.data.data.organization,
        errors: result.data.errors
      }));
    });
  };
  */

  //setState using higher order function
  onFetchFromGitHub = path => {
    getIssuesOfRepository(path).then(queryResult => {
      console.log(queryResult);
      this.setState(resolveIssuesQuery(queryResult));
    });
  };

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
