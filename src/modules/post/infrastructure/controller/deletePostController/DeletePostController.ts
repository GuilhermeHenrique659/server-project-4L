import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import DeletePostService from "@modules/post/domain/service/deletePost/DeletePostService";
import ValidateUserOwnershipPostService from "@modules/user/domain/service/validateUserOwnershipPost/ValidateUserOwnershipPostService";
import { injectable } from "tsyringe";

@injectable()
class DeletePostController implements IController {
    constructor(private readonly _deletePostService: DeletePostService,
        private readonly _validatePostOwnershipService: ValidateUserOwnershipPostService) { }

    public async handle({ data, user }: ControllerInput<{ postId: string }>): Promise<ControllerOutput<{ removed: boolean }>> {
        const { postId } = data;
        const userId = user?.id as string

        await this._validatePostOwnershipService.execute({
            postId, userId
        });

        await this._deletePostService.execute({ postId });

        return {
            removed: true,
        };
    }
}

export default DeletePostController;