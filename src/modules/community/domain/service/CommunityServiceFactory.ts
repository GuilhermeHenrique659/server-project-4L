import IUserRepository from "@modules/user/domain/repository/IUserRepository";
import ICommunityRepository from "../repository/ICommunityRepository";
import CreateCommunityService from "./CreateCommunityService/CreateCommunityService";
import CreateCommunityPostService from "./CreateCommunityPost/CreateCommunityPostService";
import GetCommunityDataService from "./GetCommunityData/GetCommunityDataService";

class CommunityServiceFactory {
    constructor (private readonly _communityRepository: ICommunityRepository,
        private readonly _userRepository: IUserRepository){}

    public getCreateCommunity(){
        return new CreateCommunityService(this._communityRepository, this._userRepository);
    }

    public getCreateCommunityPost() {
        return new CreateCommunityPostService(this._communityRepository);
    }

    public getCommunityData() {
        return new GetCommunityDataService(this._communityRepository);
    }
}

export default CommunityServiceFactory;