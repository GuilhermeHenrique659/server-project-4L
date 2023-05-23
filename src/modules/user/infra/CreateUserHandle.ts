import IController from "@common/controller/IController";
import CreateUserService from "../domain/service/CreateUserService";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import User from "../domain/entity/User";

class CreateUserHandle implements IController {
    constructor (
        private _createUserService: CreateUserService
    ) {}

    public async handle(payload: ControllerInput<Record<string, string>>): Promise<ControllerOutput<User>> {
        return await this._createUserService.execute(payload)
    }
}

export default CreateUserHandle;