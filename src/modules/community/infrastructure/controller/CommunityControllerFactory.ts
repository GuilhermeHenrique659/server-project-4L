import CommunityServiceFactory from "@modules/community/domain/service/CommunityServiceFactory";
import CreateCommunityController from "./CreateCommunityController/CreateCommunityController";
import GetCommunityFeedController from "./GetCommunityFeedController/GetCommunityFeedController";
import PostServiceFactory from "@modules/post/domain/service/PostServiceFactory";

class CommunityControllerFactory {
    constructor (private readonly _comunityServicesFactory: CommunityServiceFactory,
        private readonly _postServiceFactory: PostServiceFactory) {}

    public getCreateCommunity(){
        return new CreateCommunityController(this._comunityServicesFactory);
    }

    public getCommunityFeed() {
        return new GetCommunityFeedController(this._postServiceFactory);
    }
}

export default CommunityControllerFactory;