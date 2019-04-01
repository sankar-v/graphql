import React, { Component } from "react";
import Repository from './Repository';

const Repository = ({ repository }) => (
  <div>

    <Repository repository={repository} />
    <p>
      <strong>In Repository:</strong>
      <a href={repository.url}>{repository.name}</a>
    </p>
    <ul>
        {repository.issues.edges.map(issue => (
            <li key={issue.node.id}>
            <a href={issue.node.url}>{issue.node.title}</a>
            </li>
        ))}
    </ul>
  </div>
);

export default Repository;