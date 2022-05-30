const app = require('../app')
const mockserver = require('supertest');
const mongoose = require('mongoose');
const User = require('../model/user.js')
const { MongoMemoryServer } = require('mongodb-memory-server');

/*
https://jestjs.io/docs/setup-teardown
*/

test('testing public endpoint gives public response', async() => {
    // given
    const server = mockserver(app);
    // when
    const response = await server.get('/api/public');
    // then
    expect(response.status).toBe(200);
})

test('testing private endpoint gives 401 response without authorization', async() => {
    // given
    const server = mockserver(app);
    // when
    const response = await server.get('/api/private');
    // then
    expect(response.status).toBe(401);
})

test('testing private endpoint gives 200 response after authorization', async() => {
    // given
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const connection = await mongoose.connect(uri);

    const newUser = new User({ username: 'macska', googleId: '1234567' });
    const client = mockserver.agent(app);
    await newUser.save();
    client.set('authorization', newUser._id);

    // when
    const response = await client.get('/api/private');

    // then
    expect(response.status).toBe(200);
    expect(response.body).toBe(`Hello world private ${newUser._id} `)
})

/*
https://jestjs.io/docs/setup-teardown
*/