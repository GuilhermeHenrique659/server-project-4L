import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import { CreateUserControllerDTO } from "./CreateUserControllerDTO";
import { CreateUserSessionDTOOutput } from "@modules/user/domain/service/createUserSession/CreateUserSessionDTO";

class CreateUserController implements IController {
    constructor (
        private _userServices: UserServiceFactory,
    ) {}

    public async handle(payload: ControllerInput<CreateUserControllerDTO>): Promise<ControllerOutput<CreateUserSessionDTOOutput>> {
        const { ...user } = payload.data;
            
        const { email, password } = await this._userServices.getCreateUser().execute(user);

        return await this._userServices.getCreateSession().execute({ email, password })
    }
}

export default CreateUserController;