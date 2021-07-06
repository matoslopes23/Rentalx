import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository"

interface IRequest {
    name: string;
    description:string;
}
@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationRepository
    ) {}

    async exute({name, description}: IRequest):Promise<void>{
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name)

        if(specificationAlreadyExists){
            throw new AppError("Specification already Exists!")
        }
        await this.specificationsRepository.create({
            name,
            description,
        })
    }
}

export {CreateSpecificationUseCase}