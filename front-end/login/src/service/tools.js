export const emptyItemInTheForm = (form) => Object.values(form).some(item => (item.length === 0));

export const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
};
