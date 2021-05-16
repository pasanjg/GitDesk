import gql from 'graphql-tag';

export const FETCH_USER = gql`
{
  viewer {
    login
    name
    bio
    url
    avatarUrl
    createdAt
    followers {
      totalCount
    }
    following(first: 100) {
      totalCount
    }
    starredRepositories {
      totalCount
    }
    topRepositories(first: 6, orderBy: {field: STARGAZERS, direction: DESC}) {
      nodes {
        name
        isPrivate
        isFork
        url
        nameWithOwner
        languages(first: 5) {
          nodes {
            name
            color
          }
        }
        stargazers {
          totalCount
        }
        description
        updatedAt
        collaborators {
          totalCount
          nodes {
            login
            avatarUrl
          }
        }
      }
    }
    company
    location
  }
}
`
