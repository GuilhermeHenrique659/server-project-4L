import IService from "@common/service/IService";
import ITagRepository from "../../repository/ITagRepository";
import Tag from "../../entity/Tag";

class SearchTagService implements IService {
    constructor (private readonly _tagRepository: ITagRepository) {}

    public async execute({ searchTerm }: { searchTerm: string }): Promise<Tag[]> {
        return this._tagRepository.search(searchTerm.toLocaleLowerCase());
    }
}

export default SearchTagService