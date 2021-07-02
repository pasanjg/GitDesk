import gql from 'graphql-tag';

export const FETCH_REPOSITORIES = (field, dir) => gql`
  {
    viewer {
      repositories(first: 100 orderBy:{field: ${field},direction: ${dir}}) {
        totalCount
        nodes {
          nameWithOwner
          name
          homepageUrl
          isPrivate
          isFork
          isArchived
          url
          description
          collaborators {
            totalCount
            nodes {
                login
                avatarUrl
            }
          }
          languages(first:10){
            nodes{
                name
                color
            }
          }
          forks {
            totalCount
          }

          openIssues:issues(states: OPEN) {
            totalCount
          }

          issues {
            totalCount
          }
          pullRequests {
            totalCount
          }
          openPullRequest:pullRequests(states: OPEN) {
            totalCount
          }
          stargazers {
            totalCount
          }
          watchers {
            totalCount
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`
