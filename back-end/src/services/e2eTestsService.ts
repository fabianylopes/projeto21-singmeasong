import { e2eTestsRepository } from "../repositories/e2eTestsRepository.js";

async function truncate() {
    return e2eTestsRepository.truncate();
}
  
async function seed() {
    return e2eTestsRepository.seed();
}
  
export const e2eTestsService = {
    truncate,
    seed,
};  