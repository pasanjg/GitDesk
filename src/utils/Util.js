export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = (key) => {
  try {
    return localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
  }
  catch (e) {
    clearLocalStorage()
  }
}

export const clearLocalStorage = () => {
  localStorage.clear()
}