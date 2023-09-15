import { Repository } from "@common/emun/InjectionsEmun";
import IService from "@common/service/IService";
import { inject, injectable } from "tsyringe";
import IUserRepository from "../../repository/IUserRepository";
import UserFollow from "../../entity/UserFollow";
import AppError from "@common/errors/AppError";

@injectable()
class UnfollowUserService implements IService {
    constructor(@inject(Repository.UserRepository) private readonly _userRepository: IUserRepository) { }

    public async execute(data: { userId: string, followedUserId: string }) {
        const user = await this._userRepository.findById(data.userId);
        const followUser = await this._userRepository.findById(data.followedUserId);

        if (!user || !followUser) throw new AppError('Usuarios não encontrado');

        const userFollow = new UserFollow(user, followUser);
        if (!userFollow.isAllowed(user, followUser)) throw new AppError('Recursive relationship not allowed!');

        if (!(await this._userRepository.hasRelation(userFollow))) throw new AppError('Usuario não seguido!');

        await this._userRepository.removeUserFollow(userFollow);
    }
}

export default UnfollowUserService;