import axios from 'axios';

export const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${'5377bd10e300941e2f93b8dc1af13a717f9385fa'}`
  }
});


export const GET_REPOSITORIES_FOR_ORGANIZATION = `query ($organization: String!)  
    {
    organization(login: $organization) {
        name
        url
        description
        email
        id
        websiteUrl
      repositories (first:30) {
        edges {
          node {
            createdAt
            description
            id
            name
            sshUrl
            url
            owner {
              id
              avatarUrl
            }
          }
        }
      }
    }
  }
`;  

export const getReposForOrganization = (organization) => `
      {
          organization(login: "${organization}"){
              name
              url
              repositories{
                  id
                  createdAt
                  nameWithOwner
                  name
                  url
                  sshUrl
                  resourcePath
                  description
                  issues(last:5){
                      edges {
                          node{
                              id
                              title
                              url
                          }
                      }
                  }
              }
          }
      }
  `;


//query with dynamic arguments
//string interpolation with template literals
export const getIssuesOfRepositoryQuery = (organization, repository) => `
      {
          organization(login: "${organization}"){
              name
              url
              repository(name: "${repository}){
                  name
                  url
                  issues(last:5){
                      edges {
                          node{
                              id
                              title
                              url
                          }
                      }
                  }
              }
          }
      }
  `;

//Plain JavaScript query..nothing GraphQL
export const GET_ISSUES_OF_REPOSITORY1 = `
      {
          organization(login: "the-road-to-learn-react"){
              name
              url
              repository(name:"the-road-to-learn-react"){
                  name
                  url
                  issues(last: 5){
                      edges {
                          node {
                              id
                              title
                              url
                          }
                      }
                  }
              }
          }
      }
  `;

//GraphQL query with variables in template literal
export const GET_ISSUES_OF_REPOSITORY3 = `
      query ($organization: String!, $repository: String!){
          organization(login: $organization){
              name
              url
              repository(name:$repository){
                  name
                  url
                  issues(last: 5){
                      edges {
                          node {
                              id
                              title
                              url
                          }
                      }
                  }
              }
          }
      }
  `;

  const GET_ISSUES_OF_REPOSITORY = `
  query ($organization: String!, $repository: String!, $cursor: String) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        id
        name
        url
        stargazers {
          totalCount
        }
        viewerHasStarred
        issues(first: 5, after: $cursor, states: [OPEN]) {
          edges {
            node {
              id
              title
              url
              reactions(last: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

  export const GET_ISSUES_OF_REPOSITORY_OLD = `
  query ($organization: String!, $repository: String!, $repository: String!){
      organization(login: $organization){
          name
          url
          id
          location
          avatarUrl
          description
          repository(name:$repository){
              name
              url
              sshUrl
              nameWithOwner
              resourcePath
              description
              createdAt
              issues(last: 5 states:[OPEN]){
                  edges {
                      node {
                          id
                          title
                          url
                          createdAt
                          number
                          reactions(last: 3) {
                            edges {
                              node {
                                id
                                content
                              }
                            }
                          }
                      }
                  }
              }
          }
      }
  }
`;  

export const GET_REPOSITORY_OF_ORGANIZATION = `
    {
      organization(login: "the-road-to-learn-react") {
        name
        url
        repository(name: "the-road-to-learn-react") {
          name
          url
        }
      }
    }
`;

export const ADD_STAR_TO_REPOSITORY = `
    mutation($repositoryId: ID!){
      addStar(input:{starrableId: $repositoryId}){
        starrable{
          viewerHasStarred
        }
      }
    }
`;
//organization and repository being passed in plain JavaScript
//string literala
/*
  const getIssuesOfRepository = path => {
    const [organization, repository] = path.split("/");
    return axiosGitHubGraphQL.post("", {
      query: getIssuesOfRepositoryQuery(organization, repository)
    });
  };
  */

export const getIssuesOfRepository = (path, cursor) => {
  const [organization, repository] = path.split("/");
  return axiosGitHubGraphQL.post("", {
    query: GET_ISSUES_OF_REPOSITORY,
    variables: { organization, repository, cursor }
  });
};

export const addStarToRepository = (repositoryId) =>{
  return axiosGitHubGraphQL.post("", {
      query: ADD_STAR_TO_REPOSITORY,
      variables: { repositoryId, }
  });
} 

export const resolveIssuesQuery = (queryResult, cursor) => state => {
  const { data, errors } = queryResult.data;

  if(!cursor){
    return{
      organization: data.organization,
      errors,
    };
  }

  const { edges: oldIssues} = state.organization.repository.issues;
  const { edges: newIssues } = data.organization.repository.issues;
  const updatedIssues = [...oldIssues, ...newIssues];

  return{
    organization: {
      ...data.organization,
      repository: {
        ...data.organization.repository,
        issues: {
          ...data.organization.repository.issues,
          edges: updatedIssues
        },
      },
    },
    errors,
  };
};


/*
export const resolveIssuesQuery = (queryResult) => {
  return {
    organization: queryResult.data.data.organization,
    errors: queryResult.data.errors
  }};
*/

export const getRepositoriesForOrganization = (organization)  =>{
    return axiosGitHubGraphQL.post("",{
        query: GET_REPOSITORIES_FOR_ORGANIZATION,
        variables: {organization}
    });
};

export const resolveAddStarMutation = mutationResult => state => {
  const {
    viewerHasStarred,
  } = mutationResult.data.data.addStar.starrable;

  const { totalCount } = state.organization.repository.stargazers;

  return {
    ...state,
    organization: {
      ...state.organization,
      repository: {
        ...state.organization.repository,
        viewerHasStarred,
        stargazers: {
          totalCount: totalCount + 1,
        },
      },
    },
  };
};