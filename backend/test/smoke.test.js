const app = require('../app')
const mockserver = require('supertest');

/*const assert = require('assert');
const express = require('express');

const app = express();

describe('GET /api/dashboards', function() {
    it('responds with json', function(done) {
        request(app)
            .get('/api/dashboards')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
*/
function sum(a, b) {
    return a + b;
}

test('sum 1+2=3', () => {
    // given
    // no setup required

    // when
    const result = sum(1, 2);

    // then
    expect(result).toBe(3);
})

test('/api/random returns 404', async() => {
    // given
    const server = mockserver(app);
    // when
    const response = await server.get('/api/random');

    // then
    expect(response.status).toBe(404);
})