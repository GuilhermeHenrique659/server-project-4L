import IService from "@common/service/IService";
import IUserRepository from "../../repository/IUserRepository";
import User from "../../entity/User";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class GetUserBasicInfoService implements IService {
    constructor(@inject(Repository.UserRepository) private readonly _userRepository: IUserRepository) { }

    public async execute(data: { userId: string, currentUserId: string }): Promise<Partial<User>> {

        const { name, id, avatar, hasFollowing } = await this._userRepository.findByIdWithAvatar(data.userId, true, data.currentUserId) as User;

        return {
            id,
            name,
            avatar,
            hasFollowing
        }
    }
}

export default GetUserBasicInfoService;