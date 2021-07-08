import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase:ListAvailableCarsUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("list Cars", ()=>{

    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carRepositoryInMemory);
    })

    it("should be able to list all available cars ", async ()=>{
        const car = await carRepositoryInMemory.create({
            name:"Car 1", 
            description:"Carro description", 
            daily_rate:160.00, 
            license_plate:"ASD-4751", 
            fine_amount:100, 
            brand:"Car_Brand", 
            category_id: "category_id"
        })
        const cars =  await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car])
    });

    it("shoul be able to list available cars by brand", async ()=>{
        const car = await carRepositoryInMemory.create({
            name:"Car 2", 
            description:"Carro description", 
            daily_rate:160.00, 
            license_plate:"ASD-4751", 
            fine_amount:100, 
            brand:"Car_Brand_Test", 
            category_id: "category_id"
        })
        const cars =  await listAvailableCarsUseCase.execute({
            brand:" Car_Brand",
        });

        expect(cars).toEqual([car])
    })

    it("shoul be able to list available cars by name", async ()=>{
        const car = await carRepositoryInMemory.create({
            name:"Car 3", 
            description:"Carro description", 
            daily_rate:160.00, 
            license_plate:"ASD-15264", 
            fine_amount:100, 
            brand:"Car_Brand_Test", 
            category_id: "category_id"
        })
        const cars =  await listAvailableCarsUseCase.execute({
            name:" Car3",
        });

        expect(cars).toEqual([car])
    });

    it("shoul be able to list available cars by category", async ()=>{
        const car = await carRepositoryInMemory.create({
            name:"Car 3", 
            description:"Carro description", 
            daily_rate:160.00, 
            license_plate:"ASD-15264", 
            fine_amount:100, 
            brand:"Car_Brand_Test", 
            category_id: "12345"
        })
        const cars =  await listAvailableCarsUseCase.execute({
            category_id:" 12345",
        });

        expect(cars).toEqual([car])
    })
})