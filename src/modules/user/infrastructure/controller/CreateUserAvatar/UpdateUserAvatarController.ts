import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import IUpdateUserAvatarControllerDTO from "./UpdateUserAvatarControllerDTO";


class UpdateUserAvatarController implements IController {
    constructor (
        private _userServices: UserServiceFactory,
    ) {}

    public async handle({user, data}: ControllerInput<IUpdateUserAvatarControllerDTO>): Promise<{ saved: boolean}> {
        const userId = user?.id as string
        
        await this._userServices.getUpdateAvatar().execute({ userId, fileData: data.data, type: data.type});
    
        return { saved: true }
    }
}

export default UpdateUserAvatarController;