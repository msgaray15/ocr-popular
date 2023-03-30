const BASE_URL = "http://localhost:8080";

const headers = {
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
}

export const getWithJWT = async (route, jwt) => {
    const response = await fetch(BASE_URL + route, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        },
    });
    let data = await response.json();
    response.status === 200 ? data = data.data : data = data.error;
    return {
        status: response.status,
        data
    };
}

export const get = async (route) => {
    const response = await fetch(BASE_URL + route);
    let data = await response.json();
    response.status === 200 ? data = data.data : data = data.error;
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
    let data = await response.json();
    response.status === 200 ? data = data.data : data = data.error;
    return {
        status: response.status,
        data
    };
}