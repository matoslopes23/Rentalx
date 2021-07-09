import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadoCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
    filename:string;
}

class UploadoCarImageController {
    async handle(request:Request, response:Response): Promise<Response>{
        const { id } = request.params;
        const images = request.files as IFiles[];
        const uploadoCarImageUseCase = container.resolve(UploadoCarImageUseCase);

        const images_name = images.map((file)=> file.filename)

        await uploadoCarImageUseCase.execute({
            car_id:id,
            images_name,
        })

        return response.status(201).send();
    }
}
export { UploadoCarImageController }