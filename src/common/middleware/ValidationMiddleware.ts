import { NextFunction, Request, Response } from "express";
import Joi from "joi";

class ValidationMiddleware {
    static validateRoute = (schema?: Joi.Schema) => (request: Request, response: Response, next: NextFunction)  => {
        if (!schema) {
           return next()
        }

        const data = { ...request.body, ...request.params, ...request.query }
        
        const { error } = schema.validate(data, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return response.status(400).send({ errors });
        }

        return next()
        
    }
}

export default ValidationMiddleware;