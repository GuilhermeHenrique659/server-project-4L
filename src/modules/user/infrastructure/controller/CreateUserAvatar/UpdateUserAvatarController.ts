import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import IUpdateUserAvatarControllerDTO from "./UpdateUserAvatarControllerDTO";


class UpdateUserAvatarController implements IController {
    constructor (
        private _userServices: UserServiceFactory,
    ) {}

    public async handle({user, data}: ControllerInput<IUpdateUserAvatarControllerDTO>): Promise<{ filename: string}> {
        const userId = user?.id as string
        
        const { filename } = await this._userServices.getUpdateAvatar().execute({ userId, fileData: data.data, type: data.type});
    
        return { filename }
    }
}

export default UpdateUserAvatarController;