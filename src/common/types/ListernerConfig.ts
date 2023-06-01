import IController from "@common/controller/IController"
import Joi from "joi";

export type ListenerConfig = { 
    path: string;
    controller: IController;
    isAuthenticate?: boolean;
    validator: Joi.Schema
    room?: string;
}