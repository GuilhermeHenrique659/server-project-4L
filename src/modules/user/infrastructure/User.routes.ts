import { HttpMethods } from "@common/emun/HttpMethod";
import RouterConfigurator from "@common/routes/RouterConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import UserValidation from "../validation/UserValidation";
import UserControllerFactory from "./controller/UserControllerFactory";
import { userControllerFactory } from "./controller";
import SocketConfigurator from "@common/socket/SocketConfigurator";

class UserRouter implements IHandleDomain {
    private _routerConfigurator: RouterConfigurator;
    private _validator: UserValidation;
    private _controllers: UserControllerFactory

    constructor(router: RouterConfigurator, validator: UserValidation, controllers: UserControllerFactory) {
        this._routerConfigurator = router;
        this._validator = validator
        this._controllers = controllers
    }

    public setUpHandles(): void {
        this._routerConfigurator.prefix = 'user';
        this._routerConfigurator.routesConfig = [
            {
                method: HttpMethods.POST,
                path: '/',
                controller: this._controllers.getCreateUser(),
                validator: this._validator.validateCreateUser(),
            }
        ]
    }
    get handle(): RouterConfigurator  {
        return this._routerConfigurator
    }
}

class UserSocket implements IHandleDomain {
    private _routerConfigurator: SocketConfigurator;
    private _validator: UserValidation;
    private _controllers: UserControllerFactory

    constructor(router: SocketConfigurator, validator: UserValidation, controllers: UserControllerFactory) {
        this._routerConfigurator = router;
        this._validator = validator
        this._controllers = controllers
    }

    public setUpHandles(): void {
        this._routerConfigurator.socketConfig = [
            {
                path: '/',
                controller: this._controllers.getCreateUser(),
                validator: this._validator.validateCreateUser(),
            }
        ]
    }
    get handle(): SocketConfigurator  {
        return this._routerConfigurator
    }
}

export const userSocket = new UserSocket(SocketConfigurator.getInstance(), new UserValidation, userControllerFactory)

export const userRouter = new UserRouter(new RouterConfigurator(), new UserValidation(), userControllerFactory)