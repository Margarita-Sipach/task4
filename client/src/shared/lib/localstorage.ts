import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

export const getLocalStorage = (key: string) => {
	return JSON.parse(localStorage.getItem(key) || '');
}

export const setLocalStorage = (key: string, data: any) => {
	localStorage.setItem(key, JSON.stringify(data));
}

export const removeLocalStorage = (key: string) => {
	localStorage.removeItem(key);
}