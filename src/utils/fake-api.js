const apiServerRequestHandler = {
    '/login': ({ body }) => {
        if (
            body &&
            body.username === 'hruday@gmail.com' &&
            body.password === 'hruday123'
        ) {
            return {
                id: 1,
                name: 'hruday',
                age: '11',
                gender: 'male',
                email: 'hruday@gmail.com',
                phoneNo: '9415346313',
            };
        } else {
            throw new Error('Invalid username or password');
        }
    },
    '/users': () => {
        return [
            {
                id: 1,
                name: 'test1',
                age: '11',
                gender: 'male',
                email: 'test1@gmail.com',
                phoneNo: '9415346313',
            },
            {
                id: 2,
                name: 'test2',
                age: '12',
                gender: 'male',
                email: 'test2@gmail.com',
                phoneNo: '9415346314',
            },
            {
                id: 3,
                name: 'test3',

                age: '13',
                gender: 'male',
                email: 'test3@gmail.com',
                phoneNo: '9415346315',
            },
            {
                id: 4,
                name: 'test4',
                age: '14',
                gender: 'male',
                email: 'test4@gmail.com',
                phoneNo: '9415346316',
            },
            {
                id: 5,
                name: 'test5',
                age: '15',
                gender: 'male',
                email: 'test5@gmail.com',
                phoneNo: '9415346317',
            },
            {
                id: 6,
                name: 'test6',
                age: '16',
                gender: 'male',
                email: 'test6@gmail.com',
                phoneNo: '9415346318',
            },
        ];
    },
};

function delayPromise(delay = 1000, value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value);
        }, delay);
    });
}

function fakeApiRequest(path, options) {
    const handler = apiServerRequestHandler[path];

    if (!handler) {
        throw new Error('fakeApiRequest - handler not exits');
    }

    return delayPromise(options.delay).then(() => {
        return handler(options);
    });
}

export function post(path, data) {
    return fakeApiRequest(path, {
        method: 'POST',
        body: data,
    });
}

export function get(path) {
    return fakeApiRequest(path, { method: 'GET' });
}

export default fakeApiRequest;
