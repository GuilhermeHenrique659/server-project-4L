import IService, { serviceDTOType, serviceOutputType } from "@common/service/IService";
import User from "@modules/user/domain/entity/User";
import { CreateUserServiceDTO } from "./CreateUserServiceDTO";
import AppError from "@common/errors/AppError";
import IUserRepository from "../../repository/IUserRepository";
import IHashProvider from "@common/provider/hash/IHashProvider";

class CreateUserService implements IService {
    constructor (
        private readonly _userRepository: IUserRepository,
        private readonly _hashProvider: IHashProvider
    ) {}

    public async execute(data: serviceDTOType<CreateUserServiceDTO>): Promise<serviceOutputType<User>> {
        const emailExists = await this._userRepository.findByEmail(data.email);
        
        if (emailExists) {            
            throw new AppError('email already used', 403)
        }

        data.password = await this._hashProvider.generateHash(data.password);
        const user = new User(data);

        await this._userRepository.save(user);
        return user
    }
}

export default CreateUserService;