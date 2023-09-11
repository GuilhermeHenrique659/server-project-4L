import { Repository } from "@common/emun/InjectionsEmun";
import IService from "@common/service/IService";
import { inject, injectable } from "tsyringe";
import IUserRepository from "../../repository/IUserRepository";
import User from "../../entity/User";
import AppError from "@common/errors/AppError";

@injectable()
class GetUserService implements IService {
    constructor(@inject(Repository.UserRepository) private readonly _userRepository: IUserRepository) { }

    public async execute(data: { userId: string }): Promise<User> {
        const user = await this._userRepository.findByIdCompleteData(data.userId);

        if (!user) throw new AppError('Usuario não encontrado');

        return user;
    }
}

export default GetUserService;