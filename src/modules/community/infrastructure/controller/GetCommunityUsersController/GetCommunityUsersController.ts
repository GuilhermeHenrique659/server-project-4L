import IController from "@common/controller/IController";
import { nodeCacheDataBase } from "@common/database/MemoryDataBase";
import { ControllerInput } from "@common/types/ControllerIO";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";

class GetControllerUserController implements IController {
    constructor(private readonly userServiceFactory: UserServiceFactory) {}

    public async handle(payload: ControllerInput<{ communityId: string }>): Promise<any> {
        const { data: { communityId } } = payload;
        const userIds = await nodeCacheDataBase.get<Set<string>>(`community/${communityId}`);
        console.log(userIds);
        
        const users = [];
        if (userIds) {
            for (const userId of userIds) {
                users.push(
                    await this.userServiceFactory.getUserBasicInfo().execute({ userId })
                );
            }
        }

        return users;
    }
}

export default GetControllerUserController;