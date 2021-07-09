import { Renatl } from "../infra/typeorm/entities/Rental";


interface IRentalsRepository {
    findOpenRentalByCar(car_id:string): Promise<Renatl>
    findOpenRenalByUser(user_id:string): Promise<Renatl>
}

export { IRentalsRepository }