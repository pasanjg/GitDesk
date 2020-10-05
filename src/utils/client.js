import ApolloClient from 'apollo-boost';
import { getLocalStorage } from './Util';

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    fetchOptions: {
        "x-accepted-oauth-scopes": "repo",
        "x-github-media-type": "github.v4",
        "x-oauth-scopes": "repo, user, read:org",
        "x-ratelimit-limit": "5000",
        "x-ratelimit-reset": "1601794371",
        "x-ratelimit-used": "1"
    },

    headers: {
        Authorization: `bearer ${getLocalStorage('token')}`,
    },
});

export default client;