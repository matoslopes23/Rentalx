import { inject, injectable } from "tsyringe"
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    specification_id:string[];
}

@injectable()
class CreateCarSpecificationUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ){}
     async execute({car_id, specification_id}:IRequest):Promise<Car> {

        const carExist = await this.carsRepository.findById(car_id);

        if(!carExist) {
            throw new AppError("Car does not exist!")
        }

        const specifications = await this.specificationRepository.findByIds(
            specification_id
        );

        carExist.specifications = specifications;

        await this.carsRepository.create(carExist);

        return carExist;
     }
}

export { CreateCarSpecificationUseCase }