import IService from "@common/service/IService";
import IPostRepository from "../../repository/IPostRepository";
import IFileRepository from "@modules/file/domain/repository/IFileRepository";
import IFileProvider from "@common/provider/file/IFileProvider";
import { CreatePostFileServiceDTO } from "./CreatePostFileServiceDTO";
import File from "@modules/file/domain/entity/File";
import PostFiles from "../../entity/PostFiles";

class CreatePostFileService implements IService {
    constructor (private readonly _postRepository: IPostRepository,
        private readonly _fileRepository: IFileRepository,
        private readonly _fileProvider: IFileProvider) {}

    public async execute(data: CreatePostFileServiceDTO): Promise<File> {
        const { post, file} = data;

        const [filename] = await this._fileProvider.save([file]);

        const createdFile = new File({
            filename,
            type: file.type
        });

        await this._fileRepository.save(createdFile);
        
        const postFile = new PostFiles(post, createdFile);
        await this._postRepository.savePostFile(postFile);

        return createdFile;
    }
}

export default CreatePostFileService;