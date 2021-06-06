export function handleError(code) {
    switch (code) {
        case 401:
            alert('Uauthorized!');
            break;
        case 302:
            console.log(302);
            break;
        case 400:
            console.log('Bad request');
            break;
        case 409:
            alert('Name already taken!')
            break;
        case 500:
            console.log('Inner Error');
            break;
        case 200:
            console.log(200);
            break;
        default:
            console.log('Default switch:', code);
            break;
    }
}

export const method = { POST: 'POST', PUT: 'PUT', GET: 'GET', DELETE: 'DELETE' }
export const _codes = { good: [200, 201, 301], bad: [401, 302, 400, 409, 500] }

export function postOrPutRequest(url, method, data, callback) {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        //handleError(res.status);
        res.json()
    }).then(data => callback(data)).catch(err => {
        let statusCode = 500
        callback(err, statusCode)
    });
}

export function GetRequest(url, callback) {

    fetch(url)
        .then(response => response.json())
        .then(data => callback(data)).catch(err => {
            let statusCode = 500;
            callback(err, statusCode)
        });
}

export const accountAuth = {
    isAuthenticated: false,
    authenticate(cb){
        this.isAuthenticated = true;
        setTimeout(cb, 100);
    },

    signOut(cb){
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
}