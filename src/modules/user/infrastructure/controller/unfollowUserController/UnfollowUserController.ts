import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import UnfollowUserService from "@modules/user/domain/service/unfollowUser/UnfollowUserService";
import { injectable } from "tsyringe";

@injectable()
class UnfollowUserController implements IController {
    constructor(private readonly unfollowUserService: UnfollowUserService) { }

    public async handle({ data, user }: ControllerInput<{ id: string }>) {
        const userId = user?.id as string;

        await this.unfollowUserService.execute({ userId, followedUserId: data.id });

        return true;
    }
}

export default UnfollowUserController;