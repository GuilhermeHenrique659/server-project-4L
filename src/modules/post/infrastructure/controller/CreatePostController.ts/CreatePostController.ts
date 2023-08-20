import IController from "@common/controller/IController";
import { CreatePostControllerDTO } from "./CreatePostControllerDTO";
import { ControllerInput } from "@common/types/ControllerIO";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";
import PostServiceFactory from "@modules/post/domain/service/PostServiceFactory";
import AppError from "@common/errors/AppError";
import Tag from "@modules/tag/domain/entity/Tag";
import { CreatePostControllerResponse } from "./CreatePostControllerResponse";
import PostPresenter from "../../presenter/PostPresenter";
import CommunityServiceFactory from "@modules/community/domain/service/CommunityServiceFactory";
import ISubject from "@common/observer/ISubject";


class CreatePostController implements IController {
    constructor(private readonly _postService: PostServiceFactory,
        private readonly _tagService: TagServiceFactory,
        private readonly _communityService: CommunityServiceFactory,
        private readonly _createPostSubject: ISubject) { }

    public async handle(payload: ControllerInput<CreatePostControllerDTO>): Promise<CreatePostControllerResponse> {
        const { content, tags, files, communityId } = payload.data;
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
        
        if (communityId){
            createdPost.community = await this._communityService.getCreateCommunityPost().execute({ post: createdPost, communityId });
            await this._createPostSubject.notify({ data: PostPresenter.createPostPresenter(createdPost), communityId, userId: user.id });
        }

        return PostPresenter.createPostPresenter(createdPost);
    }
}

export default CreatePostController;