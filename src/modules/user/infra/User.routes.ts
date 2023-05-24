import { HttpMethods } from "@common/emun/HttpMethod";
import RouterConfigurator from "@common/routes/RouterConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import CreateUserControllerFactory from "./controller/CreateUserController/CreateUserControllerFactory";
import UserValidation from "../validation/UserValidation";

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
                controller: CreateUserControllerFactory(),
                validator: this._validator.validateCreateUser(),
            }
        ]
    }
    get handle(): RouterConfigurator  {
        return this._routerConfigurator
    }
}

export const userRouter = new UserRouter(new RouterConfigurator(), new UserValidation())