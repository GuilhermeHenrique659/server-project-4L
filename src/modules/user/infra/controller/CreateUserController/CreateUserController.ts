import IController from "@common/controller/IController";
import CreateUserService from "../../../domain/service/createUser/CreateUserService";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import User from "../../../domain/entity/User";
import { CreateUserServiceDTO } from "../../../domain/service/createUser/CreateUserServiceDTO";

class CreateUserController implements IController {
    constructor (
        private _createUserService: CreateUserService
    ) {}

    public async handle(payload: ControllerInput<CreateUserServiceDTO>): Promise<ControllerOutput<User>> {
        return await this._createUserService.execute(payload)
    }
}

export default CreateUserController;