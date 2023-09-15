import { Repository } from "@common/emun/InjectionsEmun";
import IService from "@common/service/IService";
import { inject, injectable } from "tsyringe";
import IUserRepository from "../../repository/IUserRepository";
import IPostRepository from "@modules/post/domain/repository/IPostRepository";
import Post from "@modules/post/domain/entity/Post";
import User from "../../entity/User";
import UserPosted from "../../entity/UserPosted";
import AppError from "@common/errors/AppError";

@injectable()
class ValidateUserOwnershipPostService implements IService {
    constructor(@inject(Repository.UserRepository) private readonly _userRepository: IUserRepository
    ) { }

    public async execute(data: { postId: string, userId: string }) {
        const post = new Post({ id: data.postId });
        const user = new User({ id: data.userId });

        if (!(await this._userRepository.hasRelation(new UserPosted(user, post)))) {
            throw new AppError('Usuario não é dono do post');
        }
    }
}

export default ValidateUserOwnershipPostService;