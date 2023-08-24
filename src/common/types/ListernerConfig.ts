import IController from "@common/controller/IController"
import { MiddlewareInputType } from "./middlewareInputType";
import { Type } from "./DecoractorType";

export type ListenerConfig = {
    path: string;
    controller: Type<IController>;
    middleware?: Pick<MiddlewareInputType, 'validator'>
    room?: string;
}