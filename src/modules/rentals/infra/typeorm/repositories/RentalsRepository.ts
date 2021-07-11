import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { Rental } from "../entities/Rental";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";


class RentalsRepository implements IRentalsRepository {

    private repository :Repository<Rental>

    constructor(){
        this.repository = getRepository(Rental)
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({car_id});

        return openByCar;
    }
    async findOpenRenalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({user_id});

        return openByUser;
    }
    async create({car_id, expected_return_date, user_id}: ICreateRentalDTO): Promise<Rental> {
       const rental = this.repository.create({
           car_id,
           expected_return_date,
           user_id
       })

       await this.repository.save(rental);

       return rental;
    }

}

export { RentalsRepository }