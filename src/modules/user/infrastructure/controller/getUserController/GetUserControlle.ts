import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import User from "@modules/user/domain/entity/User";
import GetUserService from "@modules/user/domain/service/getUser/GetUserService";
import GetUserBasicInfoService from "@modules/user/domain/service/getUserBasicInfo/GetUserBasicInfoService";
import { injectable } from "tsyringe";
import UserPresenter from "../../presenter/UserPresenter";

@injectable()
class GetUserController implements IController {
    constructor(private readonly _getUserService: GetUserService,
        private readonly _getUserBasicInfo: GetUserBasicInfoService) { }

    public async handle({ user, data }: ControllerInput<{ id: string }>): Promise<any> {
        const userId = user?.id as string;
        let userData: User;
        if (userId === data.id)
            userData = await this._getUserService.execute({ userId: data.id });
        else
            userData = await this._getUserBasicInfo.execute({ userId: data.id, currentUserId: userId }) as User;

        return UserPresenter.getUser(userData);
    }
}

export default GetUserController;