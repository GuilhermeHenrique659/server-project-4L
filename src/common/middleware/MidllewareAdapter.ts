import { ControllerInput } from "@common/types/ControllerIO";
import { MiddlewareInputType } from "@common/types/middlewareInputType";
import Joi from "joi";
import ValidationMiddleware from "./ValidationMiddleware";
import ValidationError from "@common/errors/ValidationError";
import AppError from "@common/errors/AppError";
import AuthenticateMiddleware from "./AuthenticateMiddleware";


class MiddlewareAdapter {

    static validator(payload?: ControllerInput<any>, schema?: Joi.Schema) {
        if(!schema || !payload) return;

        const error = ValidationMiddleware.run(schema, payload);
        
        if (error) {
            throw new ValidationError(error)
        }
    }

    static isAuthenticate(token?: string, isAuthenticate?: boolean, payload?: ControllerInput<any>){
        if(!isAuthenticate) return;
        
        if (!token) throw new AppError("token is missing.")

        const userId = AuthenticateMiddleware.run(token);

        if (payload) 
            payload.user = {
                id: userId
            }

        return userId;
    }

    static run(middleware?: MiddlewareInputType, payload?: ControllerInput<any>, token?: string){                
        if (!middleware) {
            return;
        }
        
        return [
            this.validator(payload?.data, middleware.validator),

            this.isAuthenticate(token, middleware.isAuthenticate, payload)
        ];
    }

}

export default MiddlewareAdapter;