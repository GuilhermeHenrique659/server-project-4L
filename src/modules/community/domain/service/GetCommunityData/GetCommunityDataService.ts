import IService from "@common/service/IService";
import ICommunityRepository from "../../repository/ICommunityRepository";

class GetCommunityDataService implements IService {
    constructor (private readonly _communityRepository: ICommunityRepository) {}

    public async execute(data: { communityId: string, userId: string}): Promise<any> {
        return await this._communityRepository.getCommunityData(data.communityId, data.userId)
    }
}

export default GetCommunityDataService;