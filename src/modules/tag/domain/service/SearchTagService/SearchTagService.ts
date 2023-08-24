import IService from "@common/service/IService";
import ITagRepository from "../../repository/ITagRepository";
import Tag from "../../entity/Tag";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class SearchTagService implements IService {
    constructor(@inject(Repository.TagRepository) private readonly _tagRepository: ITagRepository) { }

    public async execute({ searchTerm }: { searchTerm: string }): Promise<Tag[]> {
        return this._tagRepository.search(searchTerm.toLocaleLowerCase());
    }
}

export default SearchTagService