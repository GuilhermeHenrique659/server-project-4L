import IController from "@common/controller/IController";
import { CreatePostControllerDTO } from "./CreatePostControllerDTO";
import { ControllerInput } from "@common/types/ControllerIO";
import Tag from "@modules/tag/domain/entity/Tag";
import { CreatePostControllerResponse } from "./CreatePostControllerResponse";
import PostPresenter from "../../presenter/PostPresenter";
import CreatePostNotifyCommunityObserver from "../../observer/CreatePost/CreatePostObserver";
import { injectable } from "tsyringe";
import ValidateUserCommunityService from "@modules/user/domain/service/validateUserCommunity/ValidateUserCommunityService";
import CreatePostService from "@modules/post/domain/service/CreatePostService/CreatePostService";
import CreateTagService from "@modules/tag/domain/service/CreateTagService/CreateTagService";
import FindTagService from "@modules/tag/domain/service/FindTagService/FindTagService";
import CreatePostTagService from "@modules/post/domain/service/CreatePostTagService/CreatePostTagService";
import CreatePostFileService from "@modules/post/domain/service/CreatePostFile/CreatePostFileService";
import CreateCommunityPostService from "@modules/community/domain/service/CreateCommunityPost/CreateCommunityPostService";
import CreatePostNotificationObserver from "../../observer/CreatePost/createPostNotification";
import EmitterSubject from "@common/observer/subject/EmitterSubject";

@injectable()
class CreatePostController implements IController {
    constructor(
        private readonly _validateUserCommunityService: ValidateUserCommunityService,
        private readonly _createPostService: CreatePostService,
        private readonly _createTagService: CreateTagService,
        private readonly _findTagService: FindTagService,
        private readonly _createPostTag: CreatePostTagService,
        private readonly _createPostFile: CreatePostFileService,
        private readonly _createCommunityPost: CreateCommunityPostService,
        private readonly _emitterSubject: EmitterSubject,
        private readonly _createPostObserver: CreatePostNotifyCommunityObserver,
        private readonly _createNotification: CreatePostNotificationObserver) { }

    public async handle(payload: ControllerInput<CreatePostControllerDTO>): Promise<CreatePostControllerResponse> {
        const { content, tags, files, communityId } = payload.data;
        const userId = payload.user?.id as string

        const createdPost = await this._createPostService.execute({ content, userId });

        if (tags) {
            createdPost.tags = []
            for (const tag of tags) {
                let postTag: Tag | undefined;
                if (tag.description) {
                    postTag = await this._createTagService.execute(tag);
                } else {
                    postTag = await this._findTagService.execute(tag);
                }
                if (postTag) {
                    createdPost.tags.push(postTag)
                    await this._createPostTag.execute({
                        post: createdPost,
                        tag: postTag
                    });
                }
            }
        }

        if (files) {
            createdPost.files = [];
            for (const file of files) {
                const createFile = await this._createPostFile.execute({ post: createdPost, file });
                createdPost.files.push(createFile);
            }
        }

        if (communityId) {
            await this._validateUserCommunityService.execute({ communityId, userId });
            createdPost.community = await this._createCommunityPost.execute({ post: createdPost, communityId });
            this._emitterSubject.attach(this._createPostObserver);
            this._emitterSubject.attach(this._createNotification);
        }

        const response = PostPresenter.createPostPresenter(createdPost);

        await this._emitterSubject.notify({ data: response, communityId, userId });

        return response;
    }
}

export default CreatePostController;