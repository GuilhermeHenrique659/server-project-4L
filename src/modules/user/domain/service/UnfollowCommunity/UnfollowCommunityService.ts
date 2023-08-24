import IService from "@common/service/IService";
import { UnfollowCommunityServiceDTO } from "./UnfollowCommunityServiceDTO";
import User from "../../entity/User";
import Community from "@modules/community/domain/entity/Community";
import UserCommunity from "../../entity/UserCommunity";
import IUserRepository from "../../repository/IUserRepository";
import AppError from "@common/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class UnfollowCommunityService implements IService {
    constructor(@inject(Repository.UserRepository) private readonly _userRepository: IUserRepository) { }

    public async execute({ communityId, userId }: UnfollowCommunityServiceDTO): Promise<void> {
        const user = new User({ id: userId });
        const community = new Community({ id: communityId });

        const userCommunity = new UserCommunity(user, community);

        if (!(await this._userRepository.hasFollowingCommunity(userCommunity))) {
            throw new AppError('Usuario já não está seguindo');
        }

        await this._userRepository.removeCommunity(userCommunity);
    }
}

export default UnfollowCommunityService;