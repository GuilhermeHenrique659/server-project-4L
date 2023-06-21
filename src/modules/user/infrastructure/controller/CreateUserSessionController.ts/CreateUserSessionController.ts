import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import { CreateUserSessionDTO } from "@modules/user/domain/service/createUserSession/CreateUserSessionDTO";


class CreateUserSessionController implements IController {
    constructor (private userServices: UserServiceFactory) {}

    public async handle(payload: ControllerInput<CreateUserSessionDTO>) {
        const token = this.userServices.getCreateSession().execute(payload.data);

        return token
    }
}

export default CreateUserSessionController;