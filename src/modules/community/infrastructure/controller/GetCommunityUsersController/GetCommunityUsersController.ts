import IController from "@common/controller/IController";
import { nodeCacheDataBase } from "@common/database/MemoryDataBase";
import { ControllerInput } from "@common/types/ControllerIO";
import CommunityServiceFactory from "@modules/community/domain/service/CommunityServiceFactory";
import User from "@modules/user/domain/entity/User";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";

class GetControllerUserController implements IController {
    constructor(private readonly userServiceFactory: UserServiceFactory,
        private readonly communityServiceFactory: CommunityServiceFactory) {}

    public async handle(payload: ControllerInput<{ communityId: string }>): Promise<Partial<User>[]> {
        const { data: { communityId } } = payload;
        const userIds = await this.communityServiceFactory.getCommunityUsers().execute({ communityId });
        
        const usersData = [];
        if (userIds) {
            for (const userId of userIds) {                
                const user = await this.userServiceFactory.getUserBasicInfo().execute({ userId });
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