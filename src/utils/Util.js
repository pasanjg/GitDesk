import CryptoJS from 'crypto-js';

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, CryptoJS.AES.encrypt(JSON.stringify(value), process.env.REACT_APP_CRYPT_SALT))
}

export const getLocalStorage = (key) => {
  try {
    return localStorage.getItem(key) && JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem(key).toString(), process.env.REACT_APP_CRYPT_SALT).toString(CryptoJS.enc.Utf8))
  }
  catch (e) {
    clearLocalStorage()
  }
}

export const clearLocalStorage = () => {
  localStorage.clear()
}

function appIsDev() {
  const appIsDev = process.env.NODE_ENV;
  return appIsDev;
};

export const getGitHubOAuthURL = () => {
  if (appIsDev() === 'development')
    return process.env.REACT_APP_OAUTH_DEV_URL;
  else
    return process.env.REACT_APP_OAUTH_PROD_URL;
}

export const getGitHubClientID = () => {
  if (appIsDev() === 'development')
    return process.env.REACT_APP_GITHUB_OAUTH_DEV_CLIENT_ID;
  else
    return process.env.REACT_APP_GITHUB_OAUTH_PROD_CLIENT_ID;
}

export const getGitHubClientSecret = () => {
  if (appIsDev() === 'development')
    return process.env.REACT_APP_GITHUB_OAUTH_DEV_CLIENT_SECRET;
  else
    return process.env.REACT_APP_GITHUB_OAUTH_PROD_CLIENT_SECRET;
}
