import { Repository } from "@common/emun/InjectionsEmun";
import IService from "@common/service/IService";
import { inject, injectable } from "tsyringe";
import IUserRepository from "../../repository/IUserRepository";

@injectable()
class GetFollowingUsersServices implements IService {
    constructor(@inject(Repository.UserRepository) private readonly _userRepository: IUserRepository) { }

    public async execute(data: { userId: string }) {
        const users = await this._userRepository.getFollowingUsers(data.userId);

        return users;
    }
}

export default GetFollowingUsersServices;