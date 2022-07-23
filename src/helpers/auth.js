import axios from 'axios'
export function login(credential) {
    return new Promise((res, rej) => {
        axios.post('http://127.0.0.1:8000/api/login', credential)
            .then(result => {
                res(result.data);
            })
            .catch(err => {
                rej("Wrong email or password");
            })
    })
}

export function currentUser() {
    const user = localStorage.getItem('user');

    if (!user) {
        return null;
    }

    return JSON.parse(user);
}
