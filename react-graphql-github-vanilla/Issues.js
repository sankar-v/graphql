import React, { Component } from "react";

const Issues = ({ repository }) => {

    if (!repository) {
        return (
            <ul>
                {repository.issues.edges.map(issue => (
                    <li key={issue.node.id}>
                        <a href={issue.node.url}>{issue.node.title}</a>
                    </li>
                ))}
            </ul>
        );
    }
    return <ul> No Issues for the repository!!</ul>;
};

export default Issues;
