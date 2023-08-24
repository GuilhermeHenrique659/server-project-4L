import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import { CreateUserSessionDTO } from "@modules/user/domain/service/createUserSession/CreateUserSessionDTO";
import CreateUserSessionService from "@modules/user/domain/service/createUserSession/CreateUserSessionService";
import { injectable } from "tsyringe";

@injectable()
class CreateUserSessionController implements IController {
    constructor(private createUserSession: CreateUserSessionService) { }

    public async handle(payload: ControllerInput<CreateUserSessionDTO>) {
        const token = this.createUserSession.execute(payload.data);

        return token
    }
}

export default CreateUserSessionController;