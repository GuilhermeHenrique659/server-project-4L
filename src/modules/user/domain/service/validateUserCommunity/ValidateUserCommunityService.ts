import IService from "@common/service/IService";
import IUserRepository from "../../repository/IUserRepository";
import User from "../../entity/User";
import Community from "@modules/community/domain/entity/Community";
import UserCommunity from "../../entity/UserCommunity";
import AppError from "@common/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class ValidateUserCommunityService implements IService {
    constructor(@inject(Repository.UserRepository) private readonly _userRepository: IUserRepository) { }

    public async execute(data: { communityId: string, userId: string }): Promise<void> {
        const user = new User({ id: data.userId });
        const community = new Community({ id: data.communityId });

        if (!(await this._userRepository.hasFollowingCommunity(new UserCommunity(user, community)))) {
            throw new AppError('Usuario não seguindo a communidade');
        }
    }
}

export default ValidateUserCommunityService;