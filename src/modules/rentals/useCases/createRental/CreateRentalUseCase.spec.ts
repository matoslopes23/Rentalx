import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalRepositoryInMemory
describe("Create Rental",() => {

    beforeEach(() =>{
        rentalsRepositoryInMemory = new RentalRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
    });

    it("should be able to create a new rental", async() =>{

        await createRentalUseCase.execute({
            user_id:"12344",
            car_id:"123213",
            expected_return_date: new Date()
        });
    })
})