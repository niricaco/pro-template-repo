const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();

describe('GET /api/dashboards', function() {
    it('responds with json', function(done) {
        request(app)
            .get('/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});