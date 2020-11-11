import gql from 'graphql-tag';

export const FETCH_ACTIVITY = gql`
{
  viewer {
    login
    avatarUrl
    contributionsCollection {
      contributionCalendar {
        totalContributions
        months{
          name
          year
        }
      }
      totalCommitContributions
      issueContributions {
        totalCount
      }
      pullRequestContributions {
        totalCount
      }
      pullRequestReviewContributions {
        totalCount
      }
    }
    issues(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        url
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
        url
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
