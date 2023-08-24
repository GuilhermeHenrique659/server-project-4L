import RouterConfigurator from "@common/routes/RouterConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import CommunityValidator, { communityValidator } from "../validation/CommunityValidator";
import { HttpMethods } from "@common/emun/HttpMethod";
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods";
import GetCommunityDataController from "./controller/GetCommunityDataController/GetCommunityDataController";
import CreateCommunityController from "./controller/CreateCommunityController/CreateCommunityController";


class CommunityRouter implements IHandleDomain {
    constructor(private router: RouterConfigurator,
        private validator: CommunityValidator) { }

    setUpHandles(): void {
        this.router.prefix = 'community';
        this.router.routesConfig = [
            {
                method: HttpMethods.POST,
                path: '/',
                controller: CreateCommunityController,
                middleware: {
                    isAuthenticate: true,
                    validator: this.validator.createCommunityValidator(),
                },
                status: HttpReturnMethods.SUCCESS,
            },
            {
                method: HttpMethods.GET,
                path: '/:communityId',
                controller: GetCommunityDataController,
                middleware: {
                    isAuthenticate: true,
                    validator: this.validator.getCommunityUsers()
                }
            }
        ];
    }


    get handle(): RouterConfigurator {
        return this.router;
    }
}

const communityRouter = new CommunityRouter(new RouterConfigurator(), communityValidator);
export default communityRouter;