import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRenatalController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRouter = Router();

const createRentalController = new CreateRentalController()

rentalRouter.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalRouter }