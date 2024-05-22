"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db")); // Adjust the path as needed
const insertMessage = (username, senderInd, content, date) => {
    const query = `INSERT INTO tb_user_message (username, sender_ind, content, created_dt, record_status) VALUES (?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db_1.default.query(query, [username, senderInd, content, date, 'A'], (error) => {
            if (error) {
                reject("Database query error");
            }
            else {
                resolve();
            }
        });
    });
};
const getMessagesByUsernameWithLimit = (username, limit) => {
    let response = { message: "", data: {} };
    const query = "SELECT content, created_dt, CASE WHEN sender_ind = 1 THEN true ELSE false END as isSender FROM tb_user_message WHERE username = ? AND record_status = 'A' ORDER BY id DESC LIMIT ?";
    return new Promise((resolve, reject) => {
        db_1.default.query(query, [username, limit], (error, results) => {
            if (error) {
                response.message = "Database query error";
                reject(response);
            }
            else {
                response.message = `ok`;
                response.data = results;
                resolve(response);
            }
        });
    });
};
exports.default = {
    insertMessage,
    getMessagesByUsernameWithLimit,
};
