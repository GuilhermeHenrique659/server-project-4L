import Joi from "joi";

export type MiddlewareInputType = {
    isAuthenticate?: boolean;
    validator?: Joi.Schema
}