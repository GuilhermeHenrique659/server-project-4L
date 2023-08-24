import IService, { serviceDTOType, serviceOutputType } from "@common/service/IService";
import ITagRepository from "../../repository/ITagRepository";
import Tag from "../../entity/Tag";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class FindTagService implements IService {
    constructor(@inject(Repository.TagRepository) private readonly _tagRepository: ITagRepository) { }

    public async execute(data: serviceDTOType<{ id: string }>): Promise<serviceOutputType<Tag | undefined>> {
        const tag = await this._tagRepository.findById(data.id);

        if (!tag) {
            return;
        }

        return tag
    }
}

export default FindTagService;