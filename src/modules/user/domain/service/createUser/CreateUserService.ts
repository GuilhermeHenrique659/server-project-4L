import IService, { serviceDTOType, serviceOutputType } from "@common/service/IService";
import User from "@modules/user/domain/entity/User";
import { CreateUserServiceDTO } from "./CreateUserServiceDTO";
import AppError from "@common/errors/AppError";
import IUserRepository from "../../repository/IUserRepository";

class CreateUserService implements IService {
    constructor (
        private readonly _userRepository: IUserRepository
    ) {}

    public async execute(data: serviceDTOType<CreateUserServiceDTO>): Promise<serviceOutputType<User>> {
        const emailExists = await this._userRepository.findByEmail(data.email);
        
        if (emailExists) {            
            throw new AppError('email already used', 403)
        }

        const user = new User(data);

        return await this._userRepository.save(user);
    }
}

export default CreateUserService;