import Joi from "joi";

class CommentValidator {
    public createCommentValidate() {
        return Joi.object({
            content: Joi.string().required(),
            postId: Joi.string().uuid().required(),
        });
    }

    public listCommentValidate() {
        return Joi.object({
            postId: Joi.string().uuid().required()
        })
    }
}

export default CommentValidator;