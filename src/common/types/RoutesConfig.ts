import IController from "@common/controller/IController"
import { HttpMethods } from "@common/emun/HttpMethod"
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods"
import { MiddlewareInputType } from "./middlewareInputType";
import { Type } from "./DecoractorType";

export type RoutesConfig = {
    method: HttpMethods;
    path: string;
    controller: Type<IController>;
    middleware?: MiddlewareInputType
    status?: HttpReturnMethods;
}