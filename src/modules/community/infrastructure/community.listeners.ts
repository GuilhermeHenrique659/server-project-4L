import IHandleDomain from "@common/types/IHandleDomain";
import CommunityControllerFactory from "./controller/CommunityControllerFactory";
import CommunityValidator, { communityValidator } from "../validation/CommunityValidator";
import communityControllerFactory from "./controller";
import SocketConfigurator from "@common/socket/SocketConfigurator";


class CommunityListener implements IHandleDomain {
    constructor (private socket: SocketConfigurator,
        private controller: CommunityControllerFactory,
        private validator: CommunityValidator) {}

    setUpHandles(): void {
        this.socket.socketConfig = [
            {
                path: 'community/list',
                room: 'community/:communityId',
                controller: this.controller.getCommunityFeed(),
                middleware: {
                    validator: this.validator.getCommunityFeed()
                }
            },
            {
                path: 'community/list-users',
                controller: this.controller.getCommunityUsers(),
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

const communityListener = new CommunityListener(SocketConfigurator.getInstance(), communityControllerFactory, communityValidator);
export default communityListener;