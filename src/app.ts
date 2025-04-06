import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { notFoundHandler } from "./app/utils/notFoundHandler";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

// cors middleware
app.use(cors({origin: ['http://localhost:5173', 'https://naria-task-manage-front.vercel.app'], credentials: true}));

// json parsing middleware
app.use(express.json());

// cookie parser
app.use(cookieParser());

// application routes
app.use('/', router);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to naria task management!");
});

// not found handler
app.all("*", notFoundHandler);

// global error handler middleware
app.use(globalErrorHandler);

export default app;
