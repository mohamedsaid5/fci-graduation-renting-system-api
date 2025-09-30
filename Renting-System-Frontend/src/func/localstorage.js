export const deleteStorageItem = (key) => window.localStorage.removeItem(key);

export const setStorageItem = (key, data, stringify = true) => window.localStorage.setItem(key, !stringify ? data : JSON.stringify(data));

export const getStorageItem = (key, parse = true) => {
    let item = window.localStorage.getItem(key);
    return item ? parse ? JSON.parse(item) : item : undefined;
}