import CryptoJS from 'crypto-js';

const CRYPT_SALT = "$#434376hHDBH+NGHHS^%##$@53435g50"

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, CryptoJS.AES.encrypt(JSON.stringify(value), CRYPT_SALT))
}

export const getLocalStorage = (key) => {
  try {
    return localStorage.getItem(key) && JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem(key).toString(), CRYPT_SALT).toString(CryptoJS.enc.Utf8))
  }
  catch (e) {
    clearLocalStorage()
  }
}

export const clearLocalStorage = () => {
  localStorage.clear()
}
