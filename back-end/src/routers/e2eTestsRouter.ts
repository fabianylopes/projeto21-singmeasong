import { Router } from "express";

import e2eTestsController from "../controllers/e2eTestsController.js";

const e2eTestsRouter = Router();

e2eTestsRouter.post("/reset", e2eTestsController.resetDb);
e2eTestsRouter.post("/seed", e2eTestsController.seed);

export default e2eTestsRouter;