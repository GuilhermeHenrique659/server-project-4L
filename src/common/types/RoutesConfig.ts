import IController from "@common/controller/IController"
import { HttpMethods } from "@common/emun/HttpMethod"
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods"

export type RoutesConfig = { 
    method: HttpMethods;
    path: string;
    controller: IController;
    isAuthenticate?: boolean;
    status?: HttpReturnMethods;
}