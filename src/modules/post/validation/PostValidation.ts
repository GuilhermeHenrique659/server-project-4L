import Joi from "joi";

export default class PostValidation {
    public createPostValidate(){
        return Joi.object({
            content: Joi.string().required(),
            communityId: Joi.string().uuid(),
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

    public listPost(){
        return Joi.object({
            limit: Joi.number(),
            page: Joi.number().required()
        })
    }

    public createLike(){
        return Joi.object({
            postId: Joi.string().required()
        })
    }
}
