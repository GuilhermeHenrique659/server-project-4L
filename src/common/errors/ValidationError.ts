import Joi from "joi";

export default class ValidationError {
    public message: string;

    public context?: Joi.Context

    public statusCode: number;
    
    constructor(message: string, context?: Joi.Context, statusCode = 400) {
        this.message = message;
        this.context = context;
        this.statusCode = statusCode;
    }
}