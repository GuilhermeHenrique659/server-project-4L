import IService from "@common/service/IService";
import Post from "@modules/post/domain/entity/Post";
import ICommunityRepository from "../../repository/ICommunityRepository";
import CommunityPost from "../../entity/CommunityPost";
import Community from "../../entity/Community";
import User from "@modules/user/domain/entity/User";
import IUserRepository from "@modules/user/domain/repository/IUserRepository";
import UserCommunity from "@modules/user/domain/entity/UserCommunity";
import AppError from "@common/errors/AppError";

class CreateCommunityPostService implements IService {
    constructor(private readonly _communityRepository: ICommunityRepository){}

    public async execute(data: { post: Post, communityId: string}): Promise<Community> {
        const community = await this._communityRepository.findById(data.communityId);

        const communityPost = new CommunityPost(community, data.post);

        await this._communityRepository.saveCommunityPost(communityPost);

        return community as Community;
    }
}

export default CreateCommunityPostService;