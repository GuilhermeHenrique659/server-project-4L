import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import Tag from "@modules/tag/domain/entity/Tag";
import SearchTagService from "@modules/tag/domain/service/SearchTagService/SearchTagService";
import { injectable } from "tsyringe";

@injectable()
class SearchTagController implements IController {
    constructor(private readonly _searchTagService: SearchTagService) { }

    public async handle(payload: ControllerInput<{ searchTerm: string }>): Promise<Tag[]> {
        const { searchTerm } = payload.data;
        const tags = await this._searchTagService.execute({ searchTerm });

        return tags
    }
}

export default SearchTagController;