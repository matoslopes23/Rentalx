import dayjs from "dayjs";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalRepositoryInMemory
let dayJsDateProvider: DayjsDateProvider;
describe("Create Rental",() => {
    const dayAdd24hours = dayjs().add(1, "day").toDate();
    beforeEach(() =>{
        rentalsRepositoryInMemory = new RentalRepositoryInMemory()
        dayJsDateProvider = new DayjsDateProvider()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider)
    });

    it("should be able to create a new rental", async() =>{

        const rental = await createRentalUseCase.execute({
            user_id:"12344",
            car_id:"123213",
            expected_return_date: dayAdd24hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    })
    it("should not be able to create a new rental if there is another open the same user", async() =>{

       expect( async()=>{
            await createRentalUseCase.execute({
                user_id:"12344",
                car_id:"123213",
                expected_return_date: dayAdd24hours
            });
            const rental = await createRentalUseCase.execute({
                user_id:"12344",
                car_id:"123213",
                expected_return_date: dayAdd24hours
            });
       }).rejects.toBeInstanceOf(AppError)

    })
    it("should not be able to create a new rental if there is another open the same car", async() =>{

       expect( async()=>{
            await createRentalUseCase.execute({
                user_id:"1234",
                car_id:"test",
                expected_return_date: dayAdd24hours
            });
            const rental = await createRentalUseCase.execute({
                user_id:"4321",
                car_id:"test",
                expected_return_date: dayAdd24hours
            });
       }).rejects.toBeInstanceOf(AppError)

    })
    it("should not be able to create a new rental with invalid reurn time", async() =>{

       expect( async()=>{
            await createRentalUseCase.execute({
                user_id:"4321",
                car_id:"test",
                expected_return_date: dayjs().toDate()
            });
       }).rejects.toBeInstanceOf(AppError)

    })
})