import { API_BASE } from "../constants";

export async function post(endPoint, params, headers, method) {

    return await fetch(`${API_BASE}/api/${endPoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(params)
    });
}