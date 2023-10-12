export const getLocalStorage = (key: string) => JSON.parse(localStorage.getItem(key) || '');

export const setLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};
