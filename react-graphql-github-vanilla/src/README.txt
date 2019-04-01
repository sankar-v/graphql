https://www.robinwieruch.de/react-with-graphql-tutorial/
https://developer.github.com/v4/


string interpolation with variables in javascript
//string interpolation with template literals
https://serverless-stack.com/#part-1
https://stackoverflow.com/questions/46753738/how-to-use-github-graphql-v4-api-to-query-all-repositories-in-my-organization
https://developer.github.com/v4/explorer/
https://medium.com/graphql-mastery/graphql-quick-tip-how-to-pass-variables-into-a-mutation-in-graphiql-23ecff4add57


# Type queries into this side of the screen, and you will 
# see intelligent typeaheads aware of the current GraphQL type schema, 
# live syntax, and validation errors highlighted within the text.
https://medium.com/graphql-mastery/graphql-quick-tip-how-to-pass-variables-into-a-mutation-in-graphiql-23ecff4add57


# We'll get you started with a simple query showing your username!
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

https://developer.github.com/v4/explorer/

Query Variables:

{
  "organization": "the-road-to-learn-react",
  "repository": "hackernews-client"
}


query{
  organization(login: "the-road-to-learn-react") {
    name
    url
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

In Queries.js file, replace GITHUB_TOKEN_HERE with the actual github token obtained from Github.
You could form the queries in the GraphIQL interface of Github adn then define them in query file..
make suitable changes to react front end..