const app = require('../app')
const mockserver = require('supertest');
const mongoose = require('mongoose');
const User = require('../model/user.js')
const { MongoMemoryServer } = require('mongodb-memory-server');

test('new user gets empty list', async() => {
    // given
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const connection = await mongoose.connect(uri);

    const newUser = new User({ username: 'macska', googleId: '1234567' });
    const client = mockserver.agent(app);
    await newUser.save();
    client.set('authorization', newUser._id);

    // when
    const response = await client.get('/api/dashboards');

    // then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData.user.dashboards).toStrictEqual([]);

    await connection.disconnect();
    await mongod.stop();
})