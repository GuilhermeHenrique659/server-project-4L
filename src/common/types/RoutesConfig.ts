import IController from "@common/controller/IController"
import { HttpMethods } from "@common/emun/HttpMethod"
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods"
import { MiddlewareInputType } from "./middlewareInputType";

export type RoutesConfig = { 
    method: HttpMethods;
    path: string;
    controller: IController;
    middleware?: MiddlewareInputType
    status?: HttpReturnMethods;
}