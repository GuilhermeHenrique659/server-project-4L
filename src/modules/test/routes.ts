import { HttpMethods } from "@common/emun/HttpMethod";
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods";
import RouterConfigurator from "@common/routes/RouterConfigurator";
import Controller from "./controller";
import IHandleDomain from "@common/types/IHandleDomain";

class testRoute implements IHandleDomain {
    private _routerConfigurator: RouterConfigurator;

    constructor(router: RouterConfigurator) {
        this._routerConfigurator = router;
    }

    public setUpHandles() {
        this._routerConfigurator.prefix = 'test'
        this._routerConfigurator.routesConfig = [
            {
                method: HttpMethods.POST,
                path: '/',
                status: HttpReturnMethods.SUCCESS,
                controller: new Controller()
            }
        ]
    }

    public get handle() {        
        return this._routerConfigurator 
    }
}


export const router = new testRoute(new RouterConfigurator())
