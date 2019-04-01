import React, { Component } from "react";
import RepositoryIssues from './RepositoryIssues';
import Organization from './Organization';

class OrganizationSelect extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    organization: this.props.organization,
    errors: null,
  };

  onClick = () => {
      const { organization } = this.state.organization;
        this.props.onOrganizationSelect(organization);
  }

  render() {
    const { organization, errors } = this.state;
     if (errors) {
      return (
        <p>
          <strong>Something went wrong:</strong>
          {errors.map(error => error.message).join(" ")}
        </p>
      );
    } else {
      return (
        <div>
            <p>
              <strong>Organization::</strong>
            </p>
              <a href={organization.id}>{organization.name}</a>
                {/*
                  <RepositoryIssues 
                    repository = {organization.repository} />
                */}       
          </div>
      );
    }
  }
}

export default OrganizationSelect;