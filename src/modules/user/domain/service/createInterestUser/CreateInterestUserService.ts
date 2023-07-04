import IService, { serviceDTOType } from "@common/service/IService";
import IUserRepository from "../../repository/IUserRepository";
import { CreateInterestUserServiceDTO } from "./CreateInterestUserServiceDTO";
import UserTags from "../../entity/UserTags";


class CreateInterestUserService implements IService {
    constructor (private readonly _userRepository: IUserRepository ) {}

    public async execute(data: serviceDTOType<CreateInterestUserServiceDTO>): Promise<void> {
        const { user, tag } = data;
        
        const userTags = new UserTags(user, tag)
        await this._userRepository.saveTag(userTags);
    }
}

export default CreateInterestUserService;