import IFileProvider from "@common/provider/file/IFileProvider";
import IService from "@common/service/IService";
import IFileRepository from "@modules/file/domain/repository/IFileRepository";
import ICommunityRepository from "../../repository/ICommunityRepository";
import { UpdateCommunityAvatarServiceDTO } from "./UpdateCommunityAvatarServiceDTO";
import File from "@modules/file/domain/entity/File";
import AppError from "@common/errors/AppError";
import CommunityAvatar from "../../entity/CommunityAvatar";

class UpdateCommunityAvatarService implements IService {
    constructor (private readonly _fileProvider: IFileProvider,
        private readonly _fileRepository: IFileRepository,
        private readonly _communityRepository: ICommunityRepository) {}

    public async execute(data: UpdateCommunityAvatarServiceDTO): Promise<File> {
        const { community, fileData, type } = data;

        const avatar = await this._communityRepository.findAvatarById(community.id);

        if (avatar) {
            await this._fileProvider.remove(avatar.filename);
            await this._fileRepository.remove(avatar.id);
        }

        const [filename] = await this._fileProvider.save([{ type, data: fileData}]);

        const file = new File({ filename, type});

        await this._fileRepository.save(file);

        const communityAvatar = new CommunityAvatar(community, file);
        await this._communityRepository.saveCommunityAvatar(communityAvatar);
    
        return file;
    }
}

export default UpdateCommunityAvatarService;