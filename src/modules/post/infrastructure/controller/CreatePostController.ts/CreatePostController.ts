import IController from "@common/controller/IController";
import { CreatePostControllerDTO } from "./CreatePostControllerDTO";
import { ControllerInput } from "@common/types/ControllerIO";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";
import PostServiceFactory from "@modules/post/domain/service/PostServiceFactory";
import AppError from "@common/errors/AppError";
import Tag from "@modules/tag/domain/entity/Tag";
import { CreatePostControllerResponse } from "./CreatePostControllerResponse";
import PostPresenter from "../../presenter/PostPresenter";


class CreatePostController implements IController {
    constructor(private readonly _postService: PostServiceFactory,
        private readonly _tagService: TagServiceFactory) { }

    public async handle(payload: ControllerInput<CreatePostControllerDTO>): Promise<CreatePostControllerResponse> {
        const { content, tags, files } = payload.data;
        const user = payload.user

        if (!user) throw new AppError('Usuario não autenticado');

        const createdPost = await this._postService.getCreatePost().execute({ content, userId: user.id });

        if (tags) {
            createdPost.tags = []
            for (const tag of tags) {
                let postTag: Tag | undefined;
                if (tag.description) {
                    postTag = await this._tagService.getCreateTag().execute(tag);
                } else {
                    postTag = await this._tagService.getFindTag().execute(tag);
                }
                if (postTag) {
                    createdPost.tags.push(postTag)
                    await this._postService.getCreatePostTag().execute({
                        post: createdPost,
                        tag: postTag
                    });
                }
            }
        }

        if (files) {
            createdPost.files = [];
            for (const file of files) {
                const createFile = await this._postService.getCreatePostFile().execute({ post: createdPost, file });
                createdPost.files.push(createFile);
            }
        }

        return PostPresenter.createPostPresenter(createdPost);
    }
}

export default CreatePostController;