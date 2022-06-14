import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";

interface IRequest {
    id:string;
    user_id:string;
}

class DevolutionRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalRepository:IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository:ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ){}

    async execute({ id, user_id }: IRequest): Promise<Rental>{
        const rental =  await this.rentalRepository.findById(id)
        const car = await this.carsRepository.findById(rental.car_id)
        const minimum_daily = 1;
        if(!rental){
            throw new AppError("Rental this not exist")
        }

        // Verificar o tempo de aluguel
        const dateNow = this.dateProvider.dateNow()

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        )

        if(daily <= 0){
            daily = minimum_daily
        }

        const delay  =  this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        )

        let total = 0 ;

        if(delay > 0 ){
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();

        rental.total = total;

        await this.rentalRepository.create(rental)

        await this.carsRepository.updateAvailable(car.id, true)

        return rental;

        

    }

}

export { DevolutionRentalUseCase }