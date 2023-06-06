import { ControllerInput } from "@common/types/ControllerIO";
import Joi from "joi";

class ValidationMiddleware {
    static run(schema: Joi.Schema, data: ControllerInput) {
        const { error } = schema.validate(data, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return errors
        }
    }
}

export default ValidationMiddleware;