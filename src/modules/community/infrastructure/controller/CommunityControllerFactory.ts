import CommunityServiceFactory from "@modules/community/domain/service/CommunityServiceFactory";
import CreateCommunityController from "./CreateCommunityController/CreateCommunityController";
import GetCommunityFeedController from "./GetCommunityFeedController/GetCommunityFeedController";
import PostServiceFactory from "@modules/post/domain/service/PostServiceFactory";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import GetControllerUserController from "./GetCommunityUsersController/GetCommunityUsersController";
import GetCommunityDataController from "./GetCommunityDataController/GetCommunityDataController";

class CommunityControllerFactory {
    constructor (private readonly _comunityServicesFactory: CommunityServiceFactory,
        private readonly _postServiceFactory: PostServiceFactory,
        private readonly _userServiceFactory: UserServiceFactory) {}

    public getCreateCommunity(){
        return new CreateCommunityController(this._comunityServicesFactory);
    }

    public getCommunityFeed() {
        return new GetCommunityFeedController(this._postServiceFactory);
    }

    public getCommunityUsers() {
        return new GetControllerUserController(this._userServiceFactory);
    }

    public getCommunityData() {
        return new GetCommunityDataController(this._comunityServicesFactory);
    }
}

export default CommunityControllerFactory;