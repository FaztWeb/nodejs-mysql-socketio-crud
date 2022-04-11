import { createPool } from "mysql2/promise";
import {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USER,
} from "./config.js";

export const getConnection = async () => {
  try {
    const pool = createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE, 
      ssl: {
        rejectUnauthorized: false
      } 
    });
    return pool;
  } catch (error) {
    console.error(error);
  }
};
