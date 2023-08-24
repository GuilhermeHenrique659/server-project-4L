import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import { CreateUserControllerDTO } from "./CreateUserControllerDTO";
import { CreateUserSessionDTOOutput } from "@modules/user/domain/service/createUserSession/CreateUserSessionDTO";
import { injectable } from "tsyringe";
import CreateUserService from "@modules/user/domain/service/createUser/CreateUserService";
import CreateUserSessionService from "@modules/user/domain/service/createUserSession/CreateUserSessionService";

@injectable()
class CreateUserController implements IController {
    constructor(
        private readonly _createUserService: CreateUserService,
        private readonly _createUserSessionService: CreateUserSessionService
    ) { }

    public async handle(payload: ControllerInput<CreateUserControllerDTO>): Promise<ControllerOutput<CreateUserSessionDTOOutput>> {
        const { ...user } = payload.data;

        const { email, password } = await this._createUserService.execute(user);

        return await this._createUserSessionService.execute({ email, password })
    }
}

export default CreateUserController;