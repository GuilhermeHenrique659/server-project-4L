import { HttpMethods } from "@common/emun/HttpMethod";
import RouterConfigurator from "@common/routes/RouterConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import UserValidation from "../validation/UserValidation";
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods";
import CreateUserSessionController from "./controller/CreateUserSessionController.ts/CreateUserSessionController";
import CreateUserController from "./controller/CreateUserController/CreateUserController";
import CreateUserTagsController from "./controller/CreateUserTags/CreateUserTagsController";
import UpdateUserAvatarController from "./controller/CreateUserAvatar/UpdateUserAvatarController";
import GetFollowingCommunityController from "./controller/GetFollowingCommunityController/GetFollowingCommunityController";
import FollowCommunityController from "./controller/FollowCommunityController/FollowCommunityController";
import UnfollowCommunityController from "./controller/UnfollowCommunityController/UnfollowCommunityController";
import GetUserController from "./controller/getUserController/GetUserControlle";
import UpdateUserController from "./controller/updateUser/UpdateUserController";
import FollowUserController from "./controller/followUserController/FollowUserController";
import UnfollowUserController from "./controller/unfollowUserController/UnfollowUserController";
import GetFollowingUsersController from "./controller/GetFollowingUsersController/GetFollowingUsersController";

class UserRouter implements IHandleDomain {
    private _routerConfigurator: RouterConfigurator;
    private _validator: UserValidation;

    constructor(router: RouterConfigurator, validator: UserValidation) {
        this._routerConfigurator = router;
        this._validator = validator
    }

    public setUpHandles(): void {
        this._routerConfigurator.prefix = 'user';
        this._routerConfigurator.routesConfig = [
            {
                method: HttpMethods.POST,
                path: '/',
                controller: CreateUserController,
                middleware: {
                    validator: this._validator.validateCreateUser(),
                },
            },
            {
                method: HttpMethods.PATCH,
                path: '/tags',
                controller: CreateUserTagsController,
                status: HttpReturnMethods.SUCCESS,
                middleware: {
                    isAuthenticate: true,
                    validator: this._validator.validateCreateTag(),
                }
            },
            {
                method: HttpMethods.PATCH,
                path: '/',
                controller: UpdateUserController,
                status: HttpReturnMethods.SUCCESS,
                middleware: {
                    isAuthenticate: true,
                    validator: this._validator.validateUpdateUser()
                }
            },
            {
                method: HttpMethods.PATCH,
                path: '/avatar',
                controller: UpdateUserAvatarController,
                status: HttpReturnMethods.SUCCESS,
                middleware: {
                    isAuthenticate: true,
                    validator: this._validator.validateUpdateAvatar()
                }
            },
            {
                method: HttpMethods.POST,
                path: '/login',
                controller: CreateUserSessionController,
                middleware: {
                    validator: this._validator.validateCreateSession()
                }
            },
            {
                method: HttpMethods.GET,
                path: '/community',
                controller: GetFollowingCommunityController,
                middleware: {
                    isAuthenticate: true,
                }
            },
            {
                method: HttpMethods.PATCH,
                path: '/follow/:communityId',
                controller: FollowCommunityController,
                middleware: {
                    isAuthenticate: true,
                    validator: this._validator.validateFollowCommunity(),
                }
            },
            {
                method: HttpMethods.PATCH,
                path: '/unfollow/:communityId',
                controller: UnfollowCommunityController,
                middleware: {
                    isAuthenticate: true,
                    validator: this._validator.validateFollowCommunity(),
                }
            },
            {
                method: HttpMethods.PATCH,
                path: '/follow/user/:id',
                controller: FollowUserController,
                middleware: {
                    validator: this._validator.getUser(),
                    isAuthenticate: true
                }
            },
            {
                method: HttpMethods.PATCH,
                path: '/unfollow/user/:id',
                controller: UnfollowUserController,
                middleware: {
                    validator: this._validator.getUser(),
                    isAuthenticate: true
                }
            },
            {
                method: HttpMethods.GET,
                path: '/following/users',
                controller: GetFollowingUsersController,
                middleware: {
                    isAuthenticate: true
                }
            },
            {
                method: HttpMethods.GET,
                path: '/:id',
                controller: GetUserController,
                middleware: {
                    validator: this._validator.getUser(),
                    isAuthenticate: true
                }
            },
        ]
    }
    get handle(): RouterConfigurator {
        return this._routerConfigurator
    }
}

export const userRouter = new UserRouter(new RouterConfigurator(), new UserValidation())