import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";
import SearchTagController from "./SearchTagController/SearchTagController";


class TagControllerFactory {
    constructor (private readonly _tagService: TagServiceFactory) {}

    public getSearchTag(){
        return new SearchTagController(this._tagService);
    }
}

export default TagControllerFactory;