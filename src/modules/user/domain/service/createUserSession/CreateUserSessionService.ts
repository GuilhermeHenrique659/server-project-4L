import IService, { serviceDTOType, serviceOutputType } from "@common/service/IService";
import IUserRepository from "../../repository/IUserRepository";
import IHashProvider from "@common/provider/hash/IHashProvider";
import { CreateUserSessionDTO, CreateUserSessionDTOOutput } from "./CreateUserSessionDTO";
import AppError from "@common/errors/AppError";
import AuthenticateProvider from "@common/provider/auth/AuthenticateProvider";
import UserPresenter from "@modules/user/infrastructure/presenter/UserPresenter";
import { inject, injectable } from "tsyringe";
import { Provider, Repository } from "@common/emun/InjectionsEmun";

@injectable()
class CreateUserSessionService implements IService {
    constructor(
        @inject(Repository.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(Provider.HashProvider) private readonly _hashProvider: IHashProvider,
        private readonly _authProvider: AuthenticateProvider) { }

    public async execute(data: serviceDTOType<CreateUserSessionDTO>): Promise<serviceOutputType<CreateUserSessionDTOOutput>> {
        const { email, password } = data;

        const user = await this._userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Usuario não encontrado', 403);
        }

        if (!(await this._hashProvider.compareHash(password, user.password))) {
            throw new AppError('Senha incorreta', 403);
        }

        const token = this._authProvider.sing(user);

        return UserPresenter.createUserSession(user, token);
    }
}

export default CreateUserSessionService;