import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import FollowUserService from "@modules/user/domain/service/followUser/FollowUserService";
import { injectable } from "tsyringe";

@injectable()
class FollowUserController implements IController {
    constructor(private readonly followUserService: FollowUserService) { }

    public async handle({ data, user }: ControllerInput<{ id: string }>) {
        const userId = user?.id as string;

        await this.followUserService.execute({ userId, followUserId: data.id });

        return true;
    }
}

export default FollowUserController;