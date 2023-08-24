import IHandleDomain from "@common/types/IHandleDomain";
import CommunityValidator, { communityValidator } from "../validation/CommunityValidator";
import SocketConfigurator from "@common/socket/SocketConfigurator";
import GetCommunityFeedController from "./controller/GetCommunityFeedController/GetCommunityFeedController";
import GetControllerUserController from "./controller/GetCommunityUsersController/GetCommunityUsersController";


class CommunityListener implements IHandleDomain {
    constructor(private socket: SocketConfigurator,
        private validator: CommunityValidator) { }

    setUpHandles(): void {
        this.socket.socketConfig = [
            {
                path: 'community/list',
                room: 'community/:communityId',
                controller: GetCommunityFeedController,
                middleware: {
                    validator: this.validator.getCommunityFeed()
                }
            },
            {
                path: 'community/list-users',
                controller: GetControllerUserController,
                middleware: {
                    validator: this.validator.getCommunityUsers(),
                }
            }
        ]
    }

    get handle(): SocketConfigurator {
        return this.socket
    }
}

const communityListener = new CommunityListener(SocketConfigurator.getInstance(), communityValidator);
export default communityListener;