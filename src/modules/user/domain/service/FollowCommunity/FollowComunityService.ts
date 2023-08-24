import IService from "@common/service/IService";
import { FollowCommunityServiceDTO } from "./FollowCommunityServiceDTO";
import Community from "@modules/community/domain/entity/Community";
import User from "../../entity/User";
import UserCommunity from "../../entity/UserCommunity";
import IUserRepository from "../../repository/IUserRepository";
import AppError from "@common/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class FollowCommunityService implements IService {
    constructor(@inject(Repository.UserRepository) private readonly _userRepository: IUserRepository) { }

    public async execute({ communityId, userId }: FollowCommunityServiceDTO): Promise<void> {
        const community = new Community({ id: communityId });
        const user = new User({ id: userId });

        const userCommunity = new UserCommunity(user, community);

        if (await this._userRepository.hasFollowingCommunity(userCommunity))
            throw new AppError('Usuario já está seguindo');

        await this._userRepository.saveUserCommunity(userCommunity);
    }
}

export default FollowCommunityService;