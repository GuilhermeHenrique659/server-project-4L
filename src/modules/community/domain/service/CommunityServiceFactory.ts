import IUserRepository from "@modules/user/domain/repository/IUserRepository";
import ICommunityRepository from "../repository/ICommunityRepository";
import CreateCommunityService from "./CreateCommunityService/CreateCommunityService";
import CreateCommunityPostService from "./CreateCommunityPost/CreateCommunityPostService";
import GetCommunityDataService from "./GetCommunityData/GetCommunityDataService";
import UpdateCommunityAvatarService from "./UpdateCommunityAvatarService/UpdateCommunityAvatarService";
import IFileProvider from "@common/provider/file/IFileProvider";
import IFileRepository from "@modules/file/domain/repository/IFileRepository";
import UpdateCommunityCoverService from "./UpdateCommunityCoverService/UpdateCommunityCoverService";
import UpdateCommunityTagService from "./UpdateCommunityTagService/UpdateCommunityTagService";
import GetCommunityFollowersService from "./GetCommunityFollwersService/GetCommunityFollowersService";

class CommunityServiceFactory {
    constructor (private readonly _communityRepository: ICommunityRepository,
        private readonly _userRepository: IUserRepository,
        private readonly _fileProvider: IFileProvider,
        private readonly _fileRepository: IFileRepository){}

    public getCreateCommunity(){
        return new CreateCommunityService(this._communityRepository, this._userRepository);
    }

    public getCreateCommunityPost() {
        return new CreateCommunityPostService(this._communityRepository);
    }

    public getUpdateAvatar() {
        return new UpdateCommunityAvatarService(this._fileProvider, this._fileRepository, this._communityRepository);
    }

    public getUpdateCover(){
        return new UpdateCommunityCoverService(this._fileProvider, this._fileRepository, this._communityRepository)
    }

    public getUpdateTag() {
        return new UpdateCommunityTagService(this._communityRepository);
    }

    public getCommunityUsers() {
        return new GetCommunityFollowersService(this._communityRepository);
    }

    public getCommunityData() {
        return new GetCommunityDataService(this._communityRepository);
    }
}

export default CommunityServiceFactory;