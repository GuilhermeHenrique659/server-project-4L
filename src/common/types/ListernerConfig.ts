import IController from "@common/controller/IController"
import { MiddlewareInputType } from "./middlewareInputType";

export type ListenerConfig = { 
    path: string;
    controller: IController;
    middleware?: MiddlewareInputType
    room?: string;
}