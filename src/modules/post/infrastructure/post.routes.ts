import RouterConfigurator from "@common/routes/RouterConfigurator";
import SocketConfigurator from "@common/socket/SocketConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import PostControllerFactory from "./controller/PostControllerFactory";
import postControllerFactory from "./controller";
import { HttpMethods } from "@common/emun/HttpMethod";
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods";
import PostValidation from "../validation/PostValidation";


class PostRouter implements IHandleDomain {
        constructor (private readonly router: RouterConfigurator,
            private readonly postControllerFactory: PostControllerFactory,
            private readonly postValidation: PostValidation) {}


    setUpHandles(): void {
        this.router.prefix = 'post';
        this.router.routesConfig = [
            {
                method: HttpMethods.POST,
                path: '/',
                controller: this.postControllerFactory.getCreatePostController(),
                middleware: {
                    isAuthenticate: true,
                    validator: this.postValidation.createPostValidate(),
                },
                status: HttpReturnMethods.SUCCESS
            }
        ]
    }

    get handle(): RouterConfigurator {
        return this.router;
    }
}

const postRouter = new PostRouter(new RouterConfigurator(), postControllerFactory, new PostValidation());

export default postRouter;