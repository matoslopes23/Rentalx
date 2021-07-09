import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInmemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create car specification",()=>{

    beforeEach(()=>{
        carsRepositoryInMemory = new CarRepositoryInMemory()
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory, 
            specificationsRepositoryInMemory
        );
        
    })

    it("shoud not be able to add a new specification to a now-existent car",async ()=>{
        expect(async()=>{
            const car_id = "1234";
            const specification_id = ["54321"];
            await createCarSpecificationUseCase.execute({car_id, specification_id});

        }).rejects.toBeInstanceOf(AppError)
    });

    it("shoud be able to add a new specification to the car",async ()=>{
        const car = await carsRepositoryInMemory.create({
            name: "Name car", 
            description: "Description car", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 60, 
            brand:"Brand", 
            category_id:"category"
        })
        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name:"test"
        })
        const specification_id = [specification.id];
        
        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id:car.id, 
            specification_id
        });

        expect(specificationsCars).toHaveProperty("specifications")
        expect(specificationsCars.specifications.length).toBe(1)
    });
})