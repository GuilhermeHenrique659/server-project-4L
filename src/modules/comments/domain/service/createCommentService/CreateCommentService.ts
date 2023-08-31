import { Repository } from "@common/emun/InjectionsEmun";
import IService from "@common/service/IService";
import IPostRepository from "@modules/post/domain/repository/IPostRepository";
import { inject, injectable } from "tsyringe";
import { CreateCOmmentServiceDTO } from "./CreateCommentServiceDTO";
import AppError from "@common/errors/AppError";
import Comment from "../../entity/Comment";
import PostComment from "@modules/post/domain/entity/PostComment";
import CommentUser from "../../entity/CommentUser";
import ICommentRepository from "../../repository/ICommentRepository";
import IUserRepository from "@modules/user/domain/repository/IUserRepository";
import CommentPresenter from "@modules/comments/infrastructure/presenter/CommentPresenter";

@injectable()
class CreateCommentService implements IService {
    constructor(@inject(Repository.PostRepository) private readonly _postRepository: IPostRepository,
        @inject(Repository.CommentRepository) private readonly _commentRepository: ICommentRepository,
        @inject(Repository.UserRepository) private readonly _userRepository: IUserRepository) { }

    public async execute(data: CreateCOmmentServiceDTO) {
        const { userId, postId, content } = data;
        const post = await this._postRepository.findById(postId);
        const user = await this._userRepository.findByIdWithAvatar(userId);

        if (!post || !user) throw new AppError(`Post ou Usuario não encontrado`);

        const comment = new Comment({ content });

        const postComment = new PostComment(post, comment);
        const commentUser = new CommentUser(comment, user);

        await this._commentRepository.save(comment);
        await this._commentRepository.saveCommentUser(commentUser);
        await this._postRepository.savePostComment(postComment);
        comment.user = user

        return CommentPresenter.createComment(comment);;
    }
}

export default CreateCommentService;