"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// db.js
const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
    host: 'rose-wen-yankee.cdwsey2o8nrm.ap-southeast-1.rds.amazonaws.com', // RDS endpoint
    user: process.env.DB_USER, // Your MySQL username
    password: process.env.DB_PW, // Your MySQL password
    database: 'rowense', // Your database name
    port: 3306 // Default MySQL port
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
});
exports.default = connection;
