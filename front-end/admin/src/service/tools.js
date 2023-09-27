export const emptyItemInTheForm = (form) => Object.values(form).some(item => (item.length === 0));

export const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
};

export const jwtToDataUser = () =>{
    return parseJwt(sessionStorage.getItem("token"))?.data;
}

export const pageSize = JSON.parse(process.env.REACT_APP_PAGE_SIZE);

export const defaultPageSize = parseInt(process.env.REACT_APP_DEFAULT_PAGE_SIZE, 10);