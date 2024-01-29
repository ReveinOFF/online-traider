const LocalStorage = {
  get: (key) => {
    return localStorage.getItem(key);
  },

  set: (key, value) => {
    localStorage.setItem(key, value);
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  updateString: (key, value) => {
    const newValue = `${localStorage.getItem(key)} ${value}`;
    localStorage.setItem(key, newValue);
  },

  updateArray: (key, value) => {
    const arr = JSON.parse(localStorage.getItem(key));
    arr.push(value);
    localStorage.setItem(key, arr);
  },
};

export default LocalStorage;
