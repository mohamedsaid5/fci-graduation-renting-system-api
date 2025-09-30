import { getStorageItem } from "./localstorage";
import { post, get, apiStore } from './helpers';
import { handleError } from "./handleError";

export default async function fetchData(endPoint, params = {}, defaultErrorMessage = 'Failed To Call Api', method = "POST", withCache = true, headers = {}) {
    let isOk = false;

    try {

        let token = getStorageItem('auth_t');

        if (token) headers = { 'Authorization': `Token ${token}` };

        let cache = apiStore.get(endPoint);
        if (cache && withCache) return cache;

        const response = method == 'PUT' || method == "POST" ? await post(endPoint, params, headers, method) : await get(endPoint, headers, method);

        const data = await response?.json();

        if (!response?.ok) {

            return {
                error_status: true,
                message: handleError(data, defaultErrorMessage),
                data: undefined,
            };

        }
        
        isOk = true;

        const res = {
            error_status: false,
            data,
        }

        if (data && method.toLowerCase() == 'get' && withCache) apiStore.set(endPoint, res);

        return res;

    } catch ({ message }) {

        console.error('Error:', message);
        // Handle sign-in error here

        return {
            error_status: !isOk,
            message: message,
            data: undefined,
        };
    }
}