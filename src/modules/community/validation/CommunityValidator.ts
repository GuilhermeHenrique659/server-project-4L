import Joi from "joi";

class CommunityValidator {
    public createCommunityValidator(){
        return Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
        })
    }

    public getCommunityFeed(){
        return Joi.object({
            communityId: Joi.string().uuid().required(),
            limit: Joi.number(),
            page: Joi.number().required(),
        })
    }
}

export const communityValidator = new CommunityValidator()
export default CommunityValidator