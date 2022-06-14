import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRenatalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRouter = Router();

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()


rentalRouter.post("/", ensureAuthenticated, createRentalController.handle);
rentalRouter.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);


export { rentalRouter }