import gql from 'graphql-tag';

export const FETCH_USER = gql`
{
  viewer {
    login
    name
    bio
    url
    avatarUrl
    resourcePath
    followers {
      totalCount
    }
    following (first: 100) {
      totalCount
    }
    repositories(first: 10, orderBy: {field: PUSHED_AT, direction: DESC}) {
      totalCount
      
    }
    starredRepositories {
      totalCount
    }
    company
    websiteUrl
    location
    isDeveloperProgramMember
    organizations(first: 100) {
      edges {
        node {
          name
        }
      }
    }
  }
}
`
