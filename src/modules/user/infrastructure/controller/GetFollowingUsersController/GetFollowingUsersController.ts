import IController from "@common/controller/IController";
import { nodeCacheDataBase } from "@common/database/MemoryDataBase";
import { ControllerInput } from "@common/types/ControllerIO";
import GetFollowingUsersServices from "@modules/user/domain/service/getFollowingUsers/GetFollowingUsersService";
import { injectable } from "tsyringe";


@injectable()
class GetFollowingUsersController implements IController {
    constructor(private readonly getFollowingUsersService: GetFollowingUsersServices) { }

    public async handle({ user }: ControllerInput<void>) {
        const users = await this.getFollowingUsersService.execute({ userId: user?.id as string });

        users.forEach(async (user) => {
            const isOnline = await nodeCacheDataBase.get<Set<string>>(user.id);
            if (isOnline) {
                user.isOnline = true
            }
        });

        return users;
    }
}

export default GetFollowingUsersController;