'use strict';

const mongoose = require('mongoose');

module.exports = (dbUrl) => {
    mongoose.Promise = require('Q').Promise;
    mongoose.connect(dbUrl);

    mongoose.connection
        .on('connected', () => console.log(`Mongoose default connection open`))
        .on('error', (err) => console.log(`Mongoose default connection error  ${err}`))
        .on('disconnected', () => console.log('Mongoose default connection disconnected'));

    process.on('SIGINT', () => {
        mongoose.connection.close(() => process.exit(0));
    });
};
