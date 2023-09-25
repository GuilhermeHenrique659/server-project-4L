import IService, { serviceDTOType, serviceOutputType } from "@common/service/IService";
import User from "@modules/user/domain/entity/User";
import { CreateUserServiceDTO } from "./CreateUserServiceDTO";
import AppError from "@common/errors/AppError";
import IUserRepository from "../../repository/IUserRepository";
import IHashProvider from "@common/provider/hash/IHashProvider";
import { inject, injectable } from "tsyringe";
import { Provider, Repository } from "@common/emun/InjectionsEmun";
import AuthenticateProvider from "@common/provider/auth/AuthenticateProvider";
import UserPresenter from "@modules/user/infrastructure/presenter/UserPresenter";
import { CreateUserSessionDTOOutput } from "../createUserSession/CreateUserSessionDTO";

@injectable()
class CreateUserService implements IService {
    constructor(
        @inject(Repository.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(Provider.HashProvider) private readonly _hashProvider: IHashProvider,
        private readonly _authProvider: AuthenticateProvider
    ) { }

    public async execute(data: serviceDTOType<CreateUserServiceDTO>): Promise<serviceOutputType<CreateUserSessionDTOOutput>> {
        const emailExists = await this._userRepository.findByEmail(data.email);

        if (emailExists) {
            throw new AppError('email already used', 403)
        }

        data.password = await this._hashProvider.generateHash(data.password);
        const user = new User(data);

        await this._userRepository.save(user);

        const token = this._authProvider.sing(user);

        return UserPresenter.createUserSession(user, token);
    }
}

export default CreateUserService;