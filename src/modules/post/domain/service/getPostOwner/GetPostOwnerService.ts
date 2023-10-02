import { Repository } from "@common/emun/InjectionsEmun";
import IService from "@common/service/IService";
import { inject, injectable } from "tsyringe";
import IPostRepository from "../../repository/IPostRepository";
import User from "@modules/user/domain/entity/User";
import AppError from "@common/errors/AppError";

@injectable()
class GetPostOwnerService implements IService {
    constructor(@inject(Repository.PostRepository) private readonly _postRepository: IPostRepository) { }

    public async execute({ postId }: { postId: string }): Promise<User> {
        const user = await this._postRepository.findPostOwner(postId);

        if (!user) throw new AppError('Post owner not found!');

        return user;
    }
}

export default GetPostOwnerService;