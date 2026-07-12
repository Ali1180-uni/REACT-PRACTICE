import Express from "express";
import type { Router } from "express";
import { getPetById, getPets } from "../controllers/pets.controller.js";

export const petRouter: Router = Express.Router();

petRouter.get("/", getPets);

petRouter.get("/:id", getPetById);
