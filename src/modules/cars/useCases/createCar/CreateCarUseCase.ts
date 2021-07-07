import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface IRequest {
    name:string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand:string;
    category_id: string;
}

// @injectable()
class CreateCarUseCase {
    
    constructor (
        // @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){};

    async execute({
        name, 
        description, 
        daily_rate, 
        license_plate, 
        fine_amount, 
        brand, 
        category_id
    }:IRequest): Promise<Car> {
        const carAlreadExists = await this.carsRepository.findByLicensePlate(license_plate);

        if(carAlreadExists) {
            throw new AppError("Car already exist")
        }
        const car = await this.carsRepository.create({
            brand, 
            category_id, 
            daily_rate, 
            description, 
            fine_amount, 
            name, 
            license_plate
        })

        return car;

    }
}

export { CreateCarUseCase }