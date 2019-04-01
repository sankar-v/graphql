import React, { Component } from "react";
import Issues from './Issues';
import Repository from './Repository';

class RepositoryIssues extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    repository: this.props.repository
  };

  onClick = () => {
      this.props.onClick(this.state.repository);
  }

  render() {
    const repository = this.state.repository;
    return (
      <div>
        <Repository 
            repository={repository} 
            onClick = {this.onClick} />
            <ul>
            {repository.issues.edges.map(issue => (
              <li key={issue.node.id}>
                <a href={issue.node.url}>{issue.node.title}</a>
      
                <ul>
                  {issue.node.reactions.edges.map(reaction => (
                    <li key={reaction.node.id}>{reaction.node.content}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
      </div>
    );
  }
}

export default RepositoryIssues;