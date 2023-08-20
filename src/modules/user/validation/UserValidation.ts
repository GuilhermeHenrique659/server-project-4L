import Joi from "joi"

class UserValidation {

    public validateCreateUser() {
        return Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        })
    }

    public validateUpdateAvatar() {
        return Joi.object({
            data: Joi.string().required(),
            type: Joi.string().required(),
        }).required()
    }

    public validateCreateTag() {
        return Joi.object({
            tags: Joi.array().items(
                Joi.object({
                    description: Joi.string().min(3),
                    id: Joi.string(),
                }).or('description', 'id')
            ).required()
        }).required()
    }

    public validateCreateSession() {
        return Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        });
    }

    public validateFollowCommunity() {
        return Joi.object({
            communityId: Joi.string().uuid().required(),
        })
    }
}

export default UserValidation