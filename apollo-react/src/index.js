import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { RetryLink } from "apollo-link-retry";
import { onError } from 'apollo-link-error';
import { InMemoryCache } from "apollo-cache-inmemory";
import App from "../src/App/index";
import "dotenv/config";
import * as serviceWorker from "./serviceWorker";
import "./style.css";

const GITHUB_BASE_URL = "https://api.github.com/graphql";

const token = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      // do something with graphql error
    }
  
    if (networkError) {
      // do something with network error
    }
  });

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer `
  }
});

const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true
    },
    attempts: {
      max: 5,
      retryIf: (error, _operation) => !!error
    }
  });

const link = ApolloLink.from([errorLink, retryLink, httpLink]);
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
