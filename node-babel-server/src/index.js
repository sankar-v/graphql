import 'cross-fetch/polyfill';
import ApolloClient, {gql} from 'apollo-boost';

import 'dotenv/config';


const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    request: operation => {
        operation.setContext({
            headers: {
                authorization:  `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
            },
        });
    },
});

const GET_ORGANIZATION1 = gql`
{
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;

const GET_ORGANIZATION = gql`
query($organization: String!) {
    organization(login: $organization) {
      name
      url
    }
  }
`;

const GET_REPOSITORIES_OF_ORGANIZATION2 = gql`
  query($organization: String!) {
    organization(login: $organization) {
      name
      url
      repositories(first: 5) {
        edges {
          node {
            name
            url
          }
        }
      }
    }
  }
`;

//paginated with cursors and pageinfo as variables..
const GET_REPOSITORIES_OF_ORGANIZATION = gql`
query ($organization: String!, $cursor: String!) {
    organization(login: $organization) {
      name
      url
      repositories(first: 5, after :$cursor) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            name
            url
          }
        }
      }
    }
  }`;
  
  const ADD_STAR = gql`
  mutation AddStar($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR = gql`
  mutation AddStar($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;


//cursor value - Mzc (does not have next page), MzU (has next page)
client.query({
    query: GET_REPOSITORIES_OF_ORGANIZATION,
    variables: {
        organization: 'the-road-to-learn-react',
        cursor: 'Mzc',     
    }
})
.then(console.log)
.catch(errors => console.log(errors));

client.mutate({
    mutation: REMOVE_STAR,
    variables: {
        repositoryId: 'MDEwOlJlcG9zaXRvcnkxNzQ1NTU5NTU='     
    },
})
.then(console.log)
.catch(errors => console.log(errors));

