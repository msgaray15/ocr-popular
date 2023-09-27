const baseUrl = process.env.REACT_APP_BACK_END_BASE_URL;

const headers = {
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
}

export const get = async (route) => {
    const response = await fetch(baseUrl + route);
    let data = await response.json();
    response.status === 200 ? data = data.data : data = data.error;
    return {
        status: response.status,
        data
    };
}

export const post = async (route, form) => {
    const response = await fetch(baseUrl + route, {
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