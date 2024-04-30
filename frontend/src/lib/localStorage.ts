const setItem = (key: string, val: string) => {
  localStorage.setItem(key, JSON.stringify(val));
};

const getItem = (key: string) => {
  const val = localStorage.getItem(key) || "null";
  return JSON.parse(val);
};

const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export const persistentService = {
  setItem,
  getItem,
  removeItem,
};
