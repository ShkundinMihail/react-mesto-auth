export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(res => {
            return handleResponse(res);
        })
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(res => {
            //email: advancedCorves12345678@gmail.com, password: 11111111
            return handleResponse(res);
        })
}

export const verificationToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => {
            return handleResponse(res);
        });
};

const handleResponse = (res) => {
    return res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`);
}