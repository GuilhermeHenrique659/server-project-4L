import Joi from "joi"

class UserValidation {
    
    public validateCreateUser() {
        return Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8),
            tags: Joi.array().items(
                Joi.object({
                    description: Joi.string(),
                    id: Joi.string(),
                }).or('description', 'id')
            )
        })
    }
}

export default UserValidation