// Get required modules.
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Initialize express app, declare empty db variable and define server port.
const app = express();
let db;
const port = process.env.PORT || 3000;

// Basic express route to retrive all users from the database.
app.get('/users', (req, res) => {
    db.collection('users').find({}).toArray((err, docs) => {
        if (err) throw err;
        
        res.status(200).json(docs);
    });
});

// Establish connection to the database.
MongoClient.connect('mongodb://localhost:27017/mydb', (err, database) => {
    if (err) throw err;

    console.log('Connected to the database.');
    db = database;
});

// Start the express webserver.
app.listen(port, () => {
    console.log(`Webserver is online at http://localhost:${port}`);
});