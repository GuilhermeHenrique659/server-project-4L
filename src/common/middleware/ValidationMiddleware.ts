import { ControllerInput } from "@common/types/ControllerIO";
import Joi from "joi";

class ValidationMiddleware {
    static run(schema: Joi.Schema, data: ControllerInput<any>) {
        const { error } = schema.validate(data, { abortEarly: true });
        
        if (error) {
            return error.details[0]
        }
    }
}

export default ValidationMiddleware;