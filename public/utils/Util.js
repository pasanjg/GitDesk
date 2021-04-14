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
  const appIsDev = process.env.REACT_APP_IS_DEV;
  return appIsDev;
};


export const getGitHubClientID = () => {
  console.log("TEST: " + appIsDev());
  if (appIsDev() === 'true')
    return process.env.REACT_APP_GITHUB_OAUTH_DEV_CLIENT_ID;
  else
    return process.env.REACT_APP_GITHUB_OAUTH_PROD_CLIENT_ID;
}
export const getGitHubClientSecret = () => {
  if (appIsDev() === 'true')
    return process.env.REACT_APP_GITHUB_OAUTH_DEV_CLIENT_SECRET;
  else
    return process.env.REACT_APP_GITHUB_OAUTH_PROD_CLIENT_SECRET;
}
