import Joi from "joi"

class UserValidation {
    
    public validateCreateUser() {
        return Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            avatar: Joi.object({
                data: Joi.string().base64().required(),
                type: Joi.string().required(),
            }),
            tags: Joi.array().items(
                Joi.object({
                    description: Joi.string(),
                    id: Joi.string(),
                }).or('description', 'id')
            )
        })
    }

    public validateCreateSession(){
        return Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        });
    }
}

export default UserValidation