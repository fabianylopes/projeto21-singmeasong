import cors from "cors";
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import recommendationRouter from "./routers/recommendationRouter.js";
import e2eTestsRouter from "./routers/e2eTestsRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/recommendations", recommendationRouter);

if(process.env.NODE_ENV === 'test'){
    app.use(e2eTestsRouter);
}

app.use(errorHandlerMiddleware);

export default app;
