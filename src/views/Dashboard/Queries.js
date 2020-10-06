import gql from 'graphql-tag';

export const FETCH_ACTIVITY = gql`
{
  viewer {
    login
    avatarUrl
    issues(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        number
        state
        updatedAt
        participants(first: 10) {
          nodes {
            login
            avatarUrl
          }
        }
        repository {
          nameWithOwner
          url
          updatedAt
          isPrivate
        }
      }
    }
    pullRequests(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        number
        state
        updatedAt
        participants(first: 10) {
          nodes {
            login
            avatarUrl
          }
        }
        repository {
          nameWithOwner
          url
          updatedAt
          isPrivate
        }
      }
    }
    gists(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        files(limit: 1) {
          name
        }
        url
        updatedAt
        isPublic
        isFork
      }
    }
  }
}
`
