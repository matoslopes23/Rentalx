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
        const openByCar = await this.repository.findOne({
            where:{car_id, end_date:null}
        });

        return openByCar;
    }
    async findOpenRenalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({
            where:{user_id, end_date:null}
        });

        return openByUser;
    }
    async create({
        car_id, 
        expected_return_date, 
        user_id,
        id,
        end_date,
        total
    }: ICreateRentalDTO): Promise<Rental> {
       const rental = this.repository.create({
           car_id,
           expected_return_date,
           user_id,
           id,
           end_date,
           total
       })

       await this.repository.save(rental);
       console.log(rental)
       return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = this.repository.findOne(id)

        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rental = await this.repository.find({
            where:{ user_id},
            relations: ['car']
        })

        return rental;
    }

}

export { RentalsRepository }