import RouterConfigurator from "@common/routes/RouterConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import CommunityControllerFactory from "./controller/CommunityControllerFactory";
import CommunityValidator, { communityValidator } from "../validation/CommunityValidator";
import { HttpMethods } from "@common/emun/HttpMethod";
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods";
import communityControllerFactory from "./controller";


class CommunityRouter implements IHandleDomain {
    constructor (private router: RouterConfigurator,
        private controller: CommunityControllerFactory,
        private validator: CommunityValidator) {}

    setUpHandles(): void {
        this.router.prefix = 'community';
        this.router.routesConfig = [
            {
                method: HttpMethods.POST,
                path: '/',
                controller: this.controller.getCreateCommunity(),
                middleware: {
                    isAuthenticate: true,
                    validator: this.validator.createCommunityValidator(),
                },
                status: HttpReturnMethods.SUCCESS,
            },
            {
                method: HttpMethods.GET,
                path: '/:communityId',
                controller: this.controller.getCommunityData(),
                middleware: {
                    validator: this.validator.getCommunityUsers()
                }
            }
        ];
    }


    get handle(): RouterConfigurator {
        return this.router;
    }
}

const communityRouter = new CommunityRouter(new RouterConfigurator(), communityControllerFactory, communityValidator);
export default communityRouter;