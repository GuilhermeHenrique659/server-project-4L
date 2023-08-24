import IService from "@common/service/IService";
import { CreateCommunityServiceDTO } from "./CreateCommunityServiceDTO";
import Community from "../../entity/Community";
import ICommunityRepository from "../../repository/ICommunityRepository";
import IUserRepository from "@modules/user/domain/repository/IUserRepository";
import AppError from "@common/errors/AppError";
import CommunityAdmin from "../../entity/CommunityAdmin";
import UserCommunity from "@modules/user/domain/entity/UserCommunity";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class CreateCommunityService implements IService {
    constructor(@inject(Repository.CommunityRepository) private readonly _communityRepository: ICommunityRepository,
        @inject(Repository.UserRepository) private readonly _userRepository: IUserRepository) { }

    public async execute(data: CreateCommunityServiceDTO): Promise<Community> {
        const { name, userId, description } = data;

        const community = new Community({ name, description });

        const communityAlreadExists = await this._communityRepository.findByName(name);

        if (communityAlreadExists) throw new AppError('Esse nome já está em uso');

        const admin = await this._userRepository.findById(userId);

        if (!admin) throw new AppError('Admin não encontrado');

        const communityAdmin = new CommunityAdmin(community, admin);
        const userCommunity = new UserCommunity(admin, community);

        await this._communityRepository.save(community);
        await this._communityRepository.saveCommunityAdmin(communityAdmin);
        await this._userRepository.saveUserCommunity(userCommunity);

        community.admin = admin;

        return community
    }
}

export default CreateCommunityService;