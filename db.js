const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/Money_Transfer_System'; // Replace 'yourDatabaseName' with the actual database name

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose is connected to the database');
});

db.on('disconnected', () => {
    console.log('Mongoose has disconnected from the database');
});

db.on('error', (error) => {
    console.error('Mongoose connection error:', error);
});

module.exports={db};