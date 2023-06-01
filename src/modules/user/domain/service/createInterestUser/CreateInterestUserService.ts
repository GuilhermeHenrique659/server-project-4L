import IService, { serviceDTOType } from "@common/service/IService";
import IUserRepository from "../../repository/IUserRepository";
import { CreateInterestUserServiceDTO } from "./CreateInterestUserServiceDTO";


class CreateInterestUserService implements IService {
    constructor (private readonly _userRepository: IUserRepository ) {}

    public async execute(data: serviceDTOType<CreateInterestUserServiceDTO>): Promise<void> {
        const { user, tag } = data;
        await this._userRepository.saveTag(user, tag);
    }
}

export default CreateInterestUserService;