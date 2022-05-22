const axios = require('axios');

const userData = {
    email: 'test@gmail.com',
    password: 'Test12345',
    username: 'Test12345',
    role: 1,
};

const baseUrl = 'https://trollauthapp.herokuapp.com';

async function getUsers(user) {
    let response = await axios.post(`${baseUrl}/users/new`, user);

    response = await axios.post(`${baseUrl}/auth/login`, {
        password: user.password,
        username: user.username,
    });

    response = await axios.get(`${baseUrl}/users`, {
        headers: {
            Authorization: 'Bearer ' + response.data['access_token'],
        },
    });

    return response.data;
}

getUsers(userData).then((users) => {
    console.log(users);
});
