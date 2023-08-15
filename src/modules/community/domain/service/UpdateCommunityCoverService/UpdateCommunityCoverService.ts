import IFileProvider from "@common/provider/file/IFileProvider";
import IService from "@common/service/IService";
import IFileRepository from "@modules/file/domain/repository/IFileRepository";
import ICommunityRepository from "../../repository/ICommunityRepository";
import { UpdateCommunityCoverServiceDTO } from "./UpdateCommunityCoverServiceDTO";
import File from "@modules/file/domain/entity/File";
import AppError from "@common/errors/AppError";
import CommunityAvatar from "../../entity/CommunityAvatar";
import CommunityCover from "../../entity/CommunityCover";

class UpdateCommunityCoverService implements IService {
    constructor (private readonly _fileProvider: IFileProvider,
        private readonly _fileRepository: IFileRepository,
        private readonly _communityRepository: ICommunityRepository) {}

    public async execute(data: UpdateCommunityCoverServiceDTO): Promise<File> {
        const { community, fileData, type } = data;

        const avatar = await this._communityRepository.findCoverById(community.id);

        if (avatar) {
            await this._fileProvider.remove(avatar.filename);
            await this._fileRepository.remove(avatar.id);
        }

        const [filename] = await this._fileProvider.save([{ type, data: fileData}]);

        const file = new File({ filename, type});

        await this._fileRepository.save(file);

        const communityCover = new CommunityCover(community, file);
        await this._communityRepository.saveCommunityCover(communityCover);
    
        return file;
    }
}

export default UpdateCommunityCoverService;