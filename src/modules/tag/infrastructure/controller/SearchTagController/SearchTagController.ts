import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import Tag from "@modules/tag/domain/entity/Tag";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";

class SearchTagController implements IController {
    constructor (private readonly _tagService: TagServiceFactory){}

    public async handle(payload: ControllerInput<{searchTerm: string}>): Promise<Tag[]> {
        const { searchTerm } = payload.data;
        const tags = await this._tagService.getSearchTag().execute({ searchTerm });

        return tags
    }
}

export default SearchTagController;