import IFileProvider from "@common/provider/file/IFileProvider";
import IService from "@common/service/IService";
import IFileRepository from "@modules/file/domain/repository/IFileRepository";
import ICommunityRepository from "../../repository/ICommunityRepository";
import { UpdateCommunityCoverServiceDTO } from "./UpdateCommunityCoverServiceDTO";
import File from "@modules/file/domain/entity/File";
import CommunityCover from "../../entity/CommunityCover";
import { inject, injectable } from "tsyringe";
import { Provider, Repository } from "@common/emun/InjectionsEmun";

@injectable()
class UpdateCommunityCoverService implements IService {
    constructor(@inject(Provider.FileProvider) private readonly _fileProvider: IFileProvider,
        @inject(Repository.FileRepository) private readonly _fileRepository: IFileRepository,
        @inject(Repository.CommunityRepository) private readonly _communityRepository: ICommunityRepository) { }

    public async execute(data: UpdateCommunityCoverServiceDTO): Promise<File> {
        const { community, fileData, type } = data;

        const avatar = await this._communityRepository.findCoverById(community.id);

        if (avatar) {
            await this._fileProvider.remove(avatar.filename);
            await this._fileRepository.remove(avatar.id);
        }

        const [filename] = await this._fileProvider.save([{ type, data: fileData }]);

        const file = new File({ filename, type });

        await this._fileRepository.save(file);

        const communityCover = new CommunityCover(community, file);
        await this._communityRepository.saveCommunityCover(communityCover);

        return file;
    }
}

export default UpdateCommunityCoverService;