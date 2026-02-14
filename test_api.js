const http = require('http');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/artworks',
    method: 'GET',
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Response status:', res.statusCode);
        if (res.statusCode === 200) {
            try {
                console.log('Response body:', JSON.stringify(JSON.parse(data), null, 2));
            } catch (e) {
                console.log('Response body (raw):', data);
            }
        } else {
            console.log('Response body:', data);
        }
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.end();
