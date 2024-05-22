import express, { Request, Response } from "express";
import bodyParser from 'body-parser';
import { DateUtil } from "./utils/DateUtil";
import LoginService from "./services/LoginService";

import { PromiseReject } from "./models/PromiseError";

const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

// Disable CORS
app.use(cors({
  origin: '*',
}));

app.set('trust proxy', true);

interface CustomResponse {
  message: string;
  data?: any;
}

app.get("/", (req: Request, res: Response<CustomResponse>) => {
  console.log(`${DateUtil.formatDateToYYYYMMDDHHMMSS(DateUtil.getCurrentDateObjectGmt8())} - GET / loaded from: ${req.ip}`);
  const response: CustomResponse = {
    message: "Request Successful",
    data: null,
  };
  res.status(200).json(response);
});

app.post("/login", async (req, res) => {
  const clientIp = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;
  const { username, password } = req.body;
  console.log(`${DateUtil.formatDateToYYYYMMDDHHMMSS(DateUtil.getCurrentDateObjectGmt8())} - POST /login by ${username} from ${clientIp}`);
  try {
    const response = await LoginService.login(username, password);
    return res.status(200).send(response);
  } catch (err: any) {
    const { statusCode, error } = err as PromiseReject;
    return res.status(statusCode).send(error);
  }
});


app.listen(port, () => {
  console.log(`${DateUtil.formatDateToYYYYMMDDHHMMSS(DateUtil.getCurrentDateObjectGmt8())} - Example app listening at ${port}`);
});