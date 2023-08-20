import IService from "@common/service/IService";
import IUserRepository from "../../repository/IUserRepository";
import User from "../../entity/User";

class GetUserBasicInfoService implements IService {
    constructor (private readonly _userRepository: IUserRepository) {}

    public async execute(data: { userId: string}): Promise<Partial<User>> {
        
        const { name, id, avatar } = await this._userRepository.findByIdWithAvatar(data.userId) as User;
        
        return {
            id,
            name,
            avatar
        }
    }
}

export default GetUserBasicInfoService;