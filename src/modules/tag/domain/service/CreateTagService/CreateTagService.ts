import IService, { serviceDTOType, serviceOutputType } from "@common/service/IService";
import Tag from "../../entity/Tag";
import ITagRepository from "../../repository/ITagRepository";
import ICreateTagServiceDTO from "./CreateTagServiceDTO";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class CreateTagService implements IService {
    constructor(@inject(Repository.TagRepository) private readonly _tagRepository: ITagRepository) { }

    public async execute(data: serviceDTOType<ICreateTagServiceDTO>): Promise<serviceOutputType<Tag>> {
        const tagExists = await this._tagRepository.findByDescription(data.description);

        if (tagExists) {
            return tagExists;
        } else {
            const tag = new Tag(data);
            await this._tagRepository.store(tag);

            return tag
        }
    }
}

export default CreateTagService;