import { Provider, Repository } from "@common/emun/InjectionsEmun";
import IHashProvider from "@common/provider/hash/IHashProvider";
import IService from "@common/service/IService";
import UserRepository from "@modules/user/infrastructure/repository/UserRepository";
import { inject, injectable } from "tsyringe";
import { UpdateUserServiceDTO } from "./UpdateUserServiceDTO";
import AppError from "@common/errors/AppError";
import User from "../../entity/User";


@injectable()
class UpdateUserService implements IService {
    constructor(@inject(Repository.UserRepository) private readonly _userRepository: UserRepository,
        @inject(Provider.HashProvider) private readonly _hashProvider: IHashProvider) { }

    private async _validateEmail(newEmail: string, oldEmail: string) {
        if (newEmail === oldEmail) return;

        const emailExists = await this._userRepository.findByEmail(newEmail);

        if (emailExists) throw new AppError("Email já está em uso");
    }

    private async _validatePassword(password: string, hash: string) {
        if (!(await this._hashProvider.compareHash(password, hash))) {
            throw new AppError("Senha incorreta");
        }
    }

    public async execute(data: UpdateUserServiceDTO): Promise<User> {
        const user = await this._userRepository.findById(data.id);

        if (!user) throw new AppError("Usuario não encontrado");

        await this._validatePassword(data.passwordToConfirm, user.password);

        if (data.email) await this._validateEmail(data.email, user.email);

        let password: string | undefined
        if (data.password) {
            password = await this._hashProvider.generateHash(data.password);
        }

        const userUpdated = new User({
            id: data.id,
            email: data.email,
            name: data.name,
            password,
        });

        return await this._userRepository.save(userUpdated);
    }
}

export default UpdateUserService;