const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const startDb = async() => {
    const server = await MongoMemoryServer.create();
    const uri = server.getUri();
    const connection = await mongoose.connect(uri);
    return [server, connection];
}

const deleteAll = async(...collections) => {
    // for (const collection of collections) {
    //     await collection.deleteMany();
    // }
    const promises = collections.map(collection => collection.deleteMany());
    await Promise.all(promises);
}

const stopDb = async(server, connection) => {
    await connection.disconnect();
    await server.stop();
}

module.exports = { startDb, stopDb, deleteAll }