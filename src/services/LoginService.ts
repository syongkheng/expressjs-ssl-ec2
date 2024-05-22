// services/userService.ts
import db from '../config/db';
import { QueryError } from 'mysql2';
import { CustomResponse } from '../models/CustomResponse';
import { DateUtil } from '../utils/DateUtil';
import jwtManager, { Secret } from 'jsonwebtoken';
import { PromiseReject } from '../models/PromiseError';

const login = (username: string, password: string): Promise<CustomResponse> => {
  let response: CustomResponse = { message: "", data: {} };
  const SECRET_KEY = process.env.SECRET_KEY;
  const jwtPayload = { username };

  const query = "SELECT 1 FROM tb_aa_user WHERE username = ? AND password = ? AND record_status = 'A' LIMIT 1";

  return new Promise<CustomResponse>((resolve, reject) => {
    db.query(query, [username, password], (error: QueryError, results: any) => {
      if (error) {
        response.message = `no go`;
        reject({ statusCode: 500, error: response } as PromiseReject);
      } else {
        if (results.length !== null && results.length > 0) {
          const updateLastLoginQuery = "UPDATE tb_aa_user SET last_login_dt = DATE_ADD(NOW(), INTERVAL 8 HOUR) WHERE username = ?";
          db.query(updateLastLoginQuery, [username], (updateError: QueryError) => {
            if (updateError) {
              response.message = `no go`;
              reject({ statusCode: 500, error: response } as PromiseReject);
            }
            console.log(`${DateUtil.formatDateToYYYYMMDDHHMMSS(DateUtil.getCurrentDateObjectGmt8())} - POST /login SUCCESSFUL LOGIN ${username}`);
            response.message = "ok";
            const token = jwtManager.sign(jwtPayload, SECRET_KEY as Secret);
            response.data = token;
            resolve(response);
          });
        } else {
          response.message = `no go`;
          reject({ statusCode: 401, error: response } as PromiseReject);
        }
      }
    })
  })
}

export default { login };
