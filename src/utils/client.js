import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    fetchOptions: {
        "x-accepted-oauth-scopes": "repo",
        "x-github-media-type": "github.v4",
        "x-oauth-scopes": "repo, user",
        "x-ratelimit-limit": "5000",
        "x-ratelimit-reset": "1601794371",
        "x-ratelimit-used": "1"
    },

    headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
    },
});

export default client;