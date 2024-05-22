"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const DateUtil_1 = require("./utils/DateUtil");
const LoginService_1 = __importDefault(require("./services/LoginService"));
const cors = require('cors');
require('dotenv').config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const port = process.env.PORT || 3000;
// Disable CORS
app.use(cors({
    origin: '*',
}));
app.set('trust proxy', true);
app.get("/", (req, res) => {
    console.log(`${DateUtil_1.DateUtil.formatDateToYYYYMMDDHHMMSS(DateUtil_1.DateUtil.getCurrentDateObjectGmt8())} - GET / loaded from: ${req.ip}`);
    const response = {
        message: "Request Successful",
        data: null,
    };
    res.status(200).json(response);
});
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientIp = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;
    const { username, password } = req.body;
    console.log(`${DateUtil_1.DateUtil.formatDateToYYYYMMDDHHMMSS(DateUtil_1.DateUtil.getCurrentDateObjectGmt8())} - POST /login by ${username} from ${clientIp}`);
    try {
        const response = yield LoginService_1.default.login(username, password);
        return res.status(200).send(response);
    }
    catch (err) {
        const { statusCode, error } = err;
        return res.status(statusCode).send(error);
    }
}));
app.listen(port, () => {
    console.log(`${DateUtil_1.DateUtil.formatDateToYYYYMMDDHHMMSS(DateUtil_1.DateUtil.getCurrentDateObjectGmt8())} - Example app listening at ${port}`);
});
