import { Request, Response } from "express";
import { e2eTestsRepository } from "../repositories/e2eTestsRepository.js";

async function resetDb(req: Request, res: Response) {
    await e2eTestsRepository.truncate();
    res.sendStatus(200);
}

async function seed(req: Request, res: Response) {
    await e2eTestsRepository.seed();
    res.sendStatus(200);
}

export default{
    resetDb,
    seed
}