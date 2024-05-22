"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/userService.ts
const db_1 = __importDefault(require("../config/db"));
const DateUtil_1 = require("../utils/DateUtil");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (username, password) => {
    let response = { message: "", data: {} };
    const SECRET_KEY = process.env.SECRET_KEY;
    const jwtPayload = { username };
    const query = "SELECT 1 FROM tb_aa_user WHERE username = ? AND password = ? AND record_status = 'A' LIMIT 1";
    return new Promise((resolve, reject) => {
        db_1.default.query(query, [username, password], (error, results) => {
            if (error) {
                response.message = `no go`;
                reject({ statusCode: 500, error: response });
            }
            else {
                if (results.length !== null && results.length > 0) {
                    const updateLastLoginQuery = "UPDATE tb_aa_user SET last_login_dt = DATE_ADD(NOW(), INTERVAL 8 HOUR) WHERE username = ?";
                    db_1.default.query(updateLastLoginQuery, [username], (updateError) => {
                        if (updateError) {
                            response.message = `no go`;
                            reject({ statusCode: 500, error: response });
                        }
                        console.log(`${DateUtil_1.DateUtil.formatDateToYYYYMMDDHHMMSS(DateUtil_1.DateUtil.getCurrentDateObjectGmt8())} - POST /login SUCCESSFUL LOGIN ${username}`);
                        response.message = "ok";
                        const token = jsonwebtoken_1.default.sign(jwtPayload, SECRET_KEY);
                        response.data = token;
                        resolve(response);
                    });
                }
                else {
                    response.message = `no go`;
                    reject({ statusCode: 401, error: response });
                }
            }
        });
    });
};
exports.default = { login };
