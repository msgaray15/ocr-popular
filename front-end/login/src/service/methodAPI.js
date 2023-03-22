const BASE_URL = "http://localhost:8080";

const headers = {
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
}

export const get = async (route) => {
    const response = await fetch(BASE_URL + route);
    const data = await response.json();
    return {
        status: response.status,
        data
    };
}

export const post = async (route, form) => {
    const response = await fetch(BASE_URL + route, {
        method: 'POST',
        ...headers,
        body: JSON.stringify(form)
    });
    const data = await response.json();
    return {
        status: response.status,
        data
    };
}