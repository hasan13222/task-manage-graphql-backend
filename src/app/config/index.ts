import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  database_url: process.env.DB_URL,
  port: process.env.PORT,
  salt: process.env.SALT,
  node_env: process.env.NODE_ENV,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  access_token_expires: process.env.ACCESS_TOKEN_EXPIRES,
  refresh_token_expires: process.env.REFRESH_TOKEN_EXPIRES,
  smtp_password: process.env.SMTP_PASSWORD,
  client_url: process.env.CLIENT_URL
};
