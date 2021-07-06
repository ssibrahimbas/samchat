class Storage {
  setSessionStorage = (key, value) => {
    sessionStorage.setItem(key, value);
  };

  getBySessionStorage = (key) => {
    const value = sessionStorage.getItem(key);
    return value;
  };

  getArrayFromLocalStorageByKey = (key) => {
    if (localStorage.getItem(key) === null) key = [];
    else key = JSON.parse(localStorage.getItem(key));
    return key;
  };

  setArrayValueToLocalStorage = (key, value) => {
    let values = this.getArrayFromLocalStorageByKey(key);
    values.push(value);
    localStorage.setItem(key, JSON.stringify(values));
  };

  setItemToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  getItemFromLocalStorage = (key) => {
    return localStorage.getItem(key);
  };
}
