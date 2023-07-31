import IController from "@common/controller/IController"
import { MiddlewareInputType } from "./middlewareInputType";

export type ListenerConfig = { 
    path: string;
    controller: IController;
    middleware?: Pick<MiddlewareInputType, 'validator'>
    room?: string;
}