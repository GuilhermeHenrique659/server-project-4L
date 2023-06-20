import IService from "@common/service/IService";
import IUserRepository from "../../repository/IUserRepository";
import File from "@modules/file/domain/entity/File";
import { CreateAvatarServiceDTO } from "./CreateAvatarServiceDTO";
import IFileProvider from "@common/provider/file/IFileProvider";
import IFileRepository from "@modules/file/domain/repository/IFileRepository";

class CreateAvatarService implements IService {
    constructor (private readonly _userRepository: IUserRepository,
        private readonly _fileProvider: IFileProvider,
        private readonly _fileRepository: IFileRepository) { }

    public async execute(data: CreateAvatarServiceDTO): Promise<File> {
        const { user, type, fileData } = data
        await this._userRepository.removeAvatar(user.id);

        const [filename] = await this._fileProvider.save([{ type, data: fileData}]);

        const file = new File({
            filename,
            type
        });

        await this._fileRepository.save(file);

        await this._userRepository.saveAvatar(user, file);

        return file;
    }
}

export default CreateAvatarService;