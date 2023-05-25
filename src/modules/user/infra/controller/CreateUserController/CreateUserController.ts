import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import User from "../../../domain/entity/User";
import { CreateUserServiceDTO } from "../../../domain/service/createUser/CreateUserServiceDTO";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";

class CreateUserController implements IController {
    constructor (
        private _userServices: UserServiceFactory
    ) {}

    public async handle(payload: ControllerInput<CreateUserServiceDTO>): Promise<ControllerOutput<User>> {        
        return await this._userServices.getCreateUser().execute(payload);
    }
}

export default CreateUserController;