import { Renatl } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";


class RentalRepositoryInMemory implements IRentalsRepository {
    rentals:Renatl[] = []
   
    async findOpenRentalByCar(car_id: string): Promise<Renatl> {
        return this.rentals.find(rental => rental.car_id === car_id && rental.end_date === null );
    }
    async findOpenRenalByUser(user_id: string): Promise<Renatl> {
        return this.rentals.find(rental => rental.user_id === user_id && rental.end_date === null );
    }

}

export { RentalRepositoryInMemory }