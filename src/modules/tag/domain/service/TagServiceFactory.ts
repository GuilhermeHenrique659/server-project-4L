import ITagRepository from "../repository/ITagRepository";
import CreateTagService from "./CreateTagService/CreateTagService";
import FindTagService from "./FindTagService/FindTagService";

class TagServiceFactory {
    constructor (private readonly _tagRespository: ITagRepository) {}

    public getCreateTag(){
        return new CreateTagService(this._tagRespository);
    }

    public getFindTag() {
        return new FindTagService(this._tagRespository);
    }
}

export default TagServiceFactory;