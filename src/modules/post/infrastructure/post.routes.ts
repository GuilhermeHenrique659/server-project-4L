import RouterConfigurator from "@common/routes/RouterConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import { HttpMethods } from "@common/emun/HttpMethod";
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods";
import PostValidation from "../validation/PostValidation";
import CreatePostLikedController from "./controller/CreateUserLikedController.ts/CreateUserLikedController";
import ListRecommendPostController from "./controller/ListRecommendPostController/ListRecoomendPostController";
import CreatePostController from "./controller/CreatePostController.ts/CreatePostController";


class PostRouter implements IHandleDomain {
    constructor(private readonly router: RouterConfigurator,
        private readonly postValidation: PostValidation) { }


    setUpHandles(): void {
        this.router.prefix = 'post';
        this.router.routesConfig = [
            {
                method: HttpMethods.POST,
                path: '/',
                controller: CreatePostController,
                middleware: {
                    isAuthenticate: true,
                    validator: this.postValidation.createPostValidate(),
                },
                status: HttpReturnMethods.SUCCESS
            },
            {
                method: HttpMethods.GET,
                path: '/',
                controller: ListRecommendPostController,
                middleware: {
                    isAuthenticate: true,
                    validator: this.postValidation.listPost()
                },
                status: HttpReturnMethods.SUCCESS
            },
            {
                method: HttpMethods.POST,
                path: '/:postId/like',
                controller: CreatePostLikedController,
                middleware: {
                    validator: this.postValidation.createLike(),
                    isAuthenticate: true
                },
                status: HttpReturnMethods.SUCCESS
            }
        ]
    }

    get handle(): RouterConfigurator {
        return this.router;
    }
}

const postRouter = new PostRouter(new RouterConfigurator(), new PostValidation());

export default postRouter;