import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import IUpdateUserAvatarControllerDTO from "./UpdateUserAvatarControllerDTO";
import { injectable } from "tsyringe";
import UpdateAvatarService from "@modules/user/domain/service/updateAvatar/UpdateAvatarSevice";

@injectable()
class UpdateUserAvatarController implements IController {
    constructor(
        private readonly _updateUserAvatarService: UpdateAvatarService
    ) { }

    public async handle({ user, data }: ControllerInput<IUpdateUserAvatarControllerDTO>): Promise<{ filename: string }> {
        const userId = user?.id as string

        const { filename } = await this._updateUserAvatarService.execute({ userId, fileData: data.data, type: data.type });

        return { filename }
    }
}

export default UpdateUserAvatarController;