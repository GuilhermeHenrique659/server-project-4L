import IService from "@common/service/IService";
import IUserRepository from "../../repository/IUserRepository";
import File from "@modules/file/domain/entity/File";
import { CreateAvatarServiceDTO } from "./UpdateAvatarServiceDTO";
import IFileProvider from "@common/provider/file/IFileProvider";
import IFileRepository from "@modules/file/domain/repository/IFileRepository";
import UserAvatar from "../../entity/UserAvatar";
import AppError from "@common/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Provider, Repository } from "@common/emun/InjectionsEmun";

@injectable()
class UpdateAvatarService implements IService {
    constructor(@inject(Repository.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(Repository.FileRepository) private readonly _fileRepository: IFileRepository,
        @inject(Provider.FileProvider) private readonly _fileProvider: IFileProvider) { }

    public async execute(data: CreateAvatarServiceDTO): Promise<File> {
        const { userId, type, fileData } = data

        const user = await this._userRepository.findById(userId);

        if (!user) throw new AppError('User not found')

        await this._userRepository.removeAvatar(user.id);

        const [filename] = await this._fileProvider.save([{ type, data: fileData }]);

        const file = new File({
            filename,
            type
        });

        await this._fileRepository.save(file);

        const userAvatar = new UserAvatar(user, file);
        await this._userRepository.saveAvatar(userAvatar);

        return file;
    }
}

export default UpdateAvatarService;