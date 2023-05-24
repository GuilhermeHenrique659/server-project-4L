import IController from "@common/controller/IController"
import { HttpMethods } from "@common/emun/HttpMethod"
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods"
import Joi from "joi";

export type RoutesConfig = { 
    method: HttpMethods;
    path: string;
    controller: IController;
    validator?: Joi.Schema;
    isAuthenticate?: boolean;
    status?: HttpReturnMethods;
}