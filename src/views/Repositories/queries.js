import gql from 'graphql-tag';

export const FETCH_REPOSITORIES = gql`
    {
        viewer {
            repositories(first: 100) {
                totalCount
                nodes {
                    nameWithOwner
#                    homepageUrl
#                    isPrivate
#                    isFork
#                    isArchived
#                    url
#                    languages(first:10){
#                        nodes{
#                            name
#                            color
#                        }
#                    }
#
#
#                    forks {
#                        totalCount
#                    }
#                    issues {
#                        totalCount
#                    }
#                    collaborators{
#                        totalCount
#                    }
#
#                    stargazers {
#                        totalCount
#                    }
#                    watchers {
#                        totalCount
#                    }
#                    pullRequests {
#                        totalCount
#                    }
#                    labels(first: 10) {
#                        edges {
#                            node {
#                                name
#                            }
#                        }
#                    }
#                    milestones(first: 10) {
#                        edges {
#                            node {
#                                title
#                            }
#                        }
#                    }

                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`
