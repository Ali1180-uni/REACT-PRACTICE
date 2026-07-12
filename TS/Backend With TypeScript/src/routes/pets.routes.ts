import Express from "express";
import type { Router } from "express";
import { getPetById, getPets } from "../controllers/pets.controller.js";
import { validateId, pleaseAuth } from "../middlewares/pets.middlwares.js";

export const petRouter: Router = Express.Router();

petRouter.get("/", getPets);

petRouter.get("/:id", pleaseAuth, validateId, getPetById);
