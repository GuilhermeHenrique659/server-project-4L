import Joi from "joi";

class CommunityValidator {
    public createCommunityValidator(){
        const file = {
            data: Joi.string().required(),
            type: Joi.string().required(),
        }

        return Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            cover: Joi.object(file),
            avatar: Joi.object(file),
            tags: Joi.array().items(
                Joi.object({
                    description: Joi.string().min(3),
                    id: Joi.string(),
                }).or('description', 'id')
            ),
        })
    }

    public getCommunityFeed(){
        return Joi.object({
            communityId: Joi.string().uuid().required(),
            limit: Joi.number(),
            page: Joi.number().required(),
        })
    }

    public getCommunityUsers(){
        return Joi.object({
            communityId: Joi.string().uuid().required(),
        })
    }
}

export const communityValidator = new CommunityValidator()
export default CommunityValidator