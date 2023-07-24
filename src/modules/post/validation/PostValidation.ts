import Joi from "joi";

export default class PostValidation {
    public createPostValidate(){
        return Joi.object({
            content: Joi.string().required(),
            tags: Joi.array().items(
                Joi.object({
                    description: Joi.string(),
                    id: Joi.string(),
                }).or('description', 'id')
            ),
            files: Joi.array().items(
                Joi.object({
                    data: Joi.string().required(),
                    type: Joi.string().required(),
                })
            )
        })
    }

    public createLike(){
        return Joi.object({
            postId: Joi.string().required()
        })
    }
}
