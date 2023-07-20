import IService, { serviceDTOType } from "@common/service/IService";
import IUserRepository from "../../repository/IUserRepository";
import { CreateInterestUserServiceDTO } from "./CreateInterestUserServiceDTO";
import UserTags from "../../entity/UserTags";
import AppError from "@common/errors/AppError";


class CreateInterestUserService implements IService {
    constructor (private readonly _userRepository: IUserRepository ) {}

    public async execute(data: serviceDTOType<CreateInterestUserServiceDTO>): Promise<void> {
        const { userId, tag } = data;

        const user = await this._userRepository.findById(userId);
        
        if(!user) throw new AppError('User not found');
        
        const userTags = new UserTags(user, tag)
        await this._userRepository.saveTag(userTags);
    }
}

export default CreateInterestUserService;