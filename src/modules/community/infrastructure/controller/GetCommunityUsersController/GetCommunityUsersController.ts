import IController from "@common/controller/IController";
import { nodeCacheDataBase } from "@common/database/MemoryDataBase";
import { ControllerInput } from "@common/types/ControllerIO";
import GetCommunityFollowersService from "@modules/community/domain/service/GetCommunityFollwersService/GetCommunityFollowersService";
import User from "@modules/user/domain/entity/User";
import GetUserBasicInfoService from "@modules/user/domain/service/getUserBasicInfo/GetUserBasicInfoService";
import { injectable } from "tsyringe";

@injectable()
class GetControllerUserController implements IController {
    constructor(private readonly _getCommunityFollowersService: GetCommunityFollowersService,
        private readonly _getUserBasicInfoService: GetUserBasicInfoService) { }

    public async handle(payload: ControllerInput<{ communityId: string }>): Promise<Partial<User>[]> {
        const { data: { communityId } } = payload;
        const userIds = await this._getCommunityFollowersService.execute({ communityId });

        const usersData = [];
        if (userIds) {
            for (const userId of userIds) {
                const user = await this._getUserBasicInfoService.execute({ userId });
                const isOnline = await nodeCacheDataBase.get<Set<string>>(userId);
                if (isOnline) {
                    user.isOnline = true
                }
                usersData.push(user);
            }
        }

        return usersData;
    }
}

export default GetControllerUserController;