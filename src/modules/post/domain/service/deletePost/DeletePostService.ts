import { Provider, Repository } from "@common/emun/InjectionsEmun";
import IService from "@common/service/IService";
import { inject, injectable } from "tsyringe";
import IPostRepository from "../../repository/IPostRepository";
import IFileRepository from "@modules/file/domain/repository/IFileRepository";
import IFileProvider from "@common/provider/file/IFileProvider";
import AppError from "@common/errors/AppError";
import ICommentRepository from "@modules/comments/domain/repository/ICommentRepository";

@injectable()
class DeletePostService implements IService {
    constructor(@inject(Repository.PostRepository) private readonly _postRepository: IPostRepository,
        @inject(Repository.FileRepository) private readonly _fileRepository: IFileRepository,
        @inject(Repository.CommentRepository) private readonly _commentRepository: ICommentRepository,
        @inject(Provider.FileProvider) private readonly _fileProvider: IFileProvider) { }

    public async execute({ postId }: { postId: string }) {
        const post = await this._postRepository.findById(postId);

        if (!post) throw new AppError('Post não encontrado');

        const postFiles = await this._postRepository.findPostFiles(postId);

        for (const { filename, id } of postFiles) {
            await this._fileProvider.remove(filename);
            await this._fileRepository.remove(id);
        }

        const postComments = await this._postRepository.findPostComments(postId);

        for (const { id } of postComments) {
            await this._commentRepository.remove(id);
        }

        await this._postRepository.remove(postId);
    }
}

export default DeletePostService;