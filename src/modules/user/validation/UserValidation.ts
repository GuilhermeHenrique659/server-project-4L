import Joi from "joi"

class UserValidation {
    
    public validateCreateUser() {
        return Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        })
    }

    public validateUpdateAvatar(){
        return Joi.object({
            userId: Joi.string().required(),
            avatar: Joi.object({
                data: Joi.string().required(),
                type: Joi.string().required(),
            }).required(),
        })
    }

    public validateCreateTag() {
        return Joi.object({
            userId: Joi.string().required(),
            tags: Joi.array().items(
                Joi.object({
                    description: Joi.string(),
                    id: Joi.string(),
                }).or('description', 'id')
            ).required()
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