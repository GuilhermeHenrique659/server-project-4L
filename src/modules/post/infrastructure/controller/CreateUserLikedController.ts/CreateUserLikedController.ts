import IController from "@common/controller/IController";
import AppError from "@common/errors/AppError";
import { ControllerInput } from "@common/types/ControllerIO";
import PostServiceFactory from "@modules/post/domain/service/PostServiceFactory";

class CreatePostLikedController implements IController {
    constructor (private readonly postService: PostServiceFactory){}

    public async handle({ data, user }: ControllerInput<{ postId: string}>): Promise<boolean> {
        const { postId } = data;

        if (!user) throw new AppError('Usuario não autenticado');

        await this.postService.getCreateLiked().execute({
            userId: user?.id,
            postId
        });

        return true
    }
}

export default CreatePostLikedController;