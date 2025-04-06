import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`naria task manager is listening on ${config.port}`);
    });
  } catch (err) {
    console.log(err)
  }
}

main().catch((err) => console.log(err))

process.on("unhandledRejection", () => {
  console.log("unhandledRejection. shutting down server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("uncaughtException. shutting down");
  process.exit(1);
});
