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

export const appIsDev = () => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  } else {
    return false;
  }
};

export const getGitHubClientID = () => appIsDev() ? process.env.REACT_APP_GITHUB_OAUTH_DEV_CLIENT_ID : process.env.REACT_APP_GITHUB_OAUTH_PROD_CLIENT_ID;

export const getGitHubClientSecret = () => appIsDev() ? process.env.REACT_APP_GITHUB_OAUTH_DEV_CLIENT_SECRET : process.env.REACT_APP_GITHUB_OAUTH_PROD_CLIENT_SECRET;
