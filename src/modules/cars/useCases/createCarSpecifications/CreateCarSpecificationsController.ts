import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";




class CreateCarSpecificationsController {
    async handle(request:Request, response:Response) : Promise<Response>{
        const { id } = request.params;
        const { specification_id } = request.body;
        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

        const cars = await createCarSpecificationUseCase.execute({
            car_id:id,
            specification_id
        })

        return response.json(cars);
    }
}

export { CreateCarSpecificationsController }