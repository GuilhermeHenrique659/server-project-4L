import Joi from "joi";

class TagValidation {
    public searchTagValidate(){
        return Joi.object({
            searchTerm: Joi.string().min(3).required()
        })
    }
}

export default TagValidation;