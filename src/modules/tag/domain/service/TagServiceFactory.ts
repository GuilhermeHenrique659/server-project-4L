import ITagRepository from "../repository/ITagRepository";
import CreateTagService from "./CreateTagService/CreateTagService";
import FindTagService from "./FindTagService/FindTagService";
import SearchTagService from "./SearchTagService/SearchTagService";

class TagServiceFactory {
    constructor (private readonly _tagRespository: ITagRepository) {}

    public getCreateTag(){
        return new CreateTagService(this._tagRespository);
    }

    public getFindTag() {
        return new FindTagService(this._tagRespository);
    }

    public getSearchTag(){
        return new SearchTagService(this._tagRespository);
    }
}

export default TagServiceFactory;