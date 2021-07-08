import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const carsRouter = Router();

const createCarController = new CreateCarController()

carsRouter.post("/",ensureAuthenticated, ensureAdmin, createCarController.handle)

export {carsRouter}