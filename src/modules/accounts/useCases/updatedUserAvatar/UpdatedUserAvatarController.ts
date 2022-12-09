import { Request, Response } from "express";
import { container } from "tsyringe";
import { RepositoryNotTreeError } from "typeorm";
import { UpdatedUseAvatarUseCase } from "./UpdatedUserAvatarUseCase";

class UpdatedUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatar_file = request.file.fieldname;

    //    Receber arquivo

    const updatedUseAvatarUseCase = container.resolve(UpdatedUseAvatarUseCase);

    await updatedUseAvatarUseCase.execute({ user_id: id, avatar_file });

    return response.status(204).send();
  }
}

export { UpdatedUserAvatarController };
