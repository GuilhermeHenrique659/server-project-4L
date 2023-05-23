import ExpressAdapterController from "@common/adapter/controller/ExpressAdapterController";
import { RoutesConfig } from "@common/types/RoutesConfig";
import { Router } from "express";

export default class RouterConfigurator {
    private _router: Router;
    private _routesConfig: RoutesConfig[];
    private _prefix: string;

    constructor(){
        this._router = Router();    
    }

    public set routesConfig(routes: RoutesConfig[]) {
        this._routesConfig = routes;
    }

    public set prefix(prefix: string) {
        this._prefix = prefix;
    }

    public getPrefix(){
        return this._prefix;
    }

    public getRouter(){
        return this._router;
    }

    public inicializeRoutes() {
        this._routesConfig.forEach(route => {
            this._router[route.method](route.path, ExpressAdapterController.adapter(route.controller, route.status ?? 200));
        })
    }
}