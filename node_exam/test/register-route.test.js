const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('../src/app');

function makeRequest(payload) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      const req = http.request(
        {
          hostname: '127.0.0.1',
          port,
          path: '/register',
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            server.close();
            resolve({ statusCode: res.statusCode, body: data });
          });
        }
      );

      req.on('error', (error) => {
        server.close();
        reject(error);
      });

      req.write(payload);
      req.end();
    });
  });
}

test('POST /register returns a validation error instead of 404', async () => {
  const response = await makeRequest('username=&email=&password=');
  assert.notEqual(response.statusCode, 404);
  assert.equal(response.statusCode, 400);
});
