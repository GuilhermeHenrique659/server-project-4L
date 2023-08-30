import { Repository } from "@common/emun/InjectionsEmun";
import IService from "@common/service/IService";
import IPostRepository from "@modules/post/domain/repository/IPostRepository";
import { inject, injectable } from "tsyringe";
import { CreateCOmmentServiceDTO } from "./CreateCommentServiceDTO";
import AppError from "@common/errors/AppError";
import Comment from "../../entity/Comment";
import PostComment from "@modules/post/domain/entity/PostComment";
import CommentUser from "../../entity/CommentUser";
import User from "@modules/user/domain/entity/User";
import ICommentRepository from "../../repository/ICommentRepository";

@injectable()
class CreateCommentService implements IService {
    constructor(@inject(Repository.PostRepository) private readonly postRepository: IPostRepository,
        @inject(Repository.CommentRepository) private readonly commentRepository: ICommentRepository) { }

    public async execute(data: CreateCOmmentServiceDTO): Promise<Comment> {
        const { userId, postId, content } = data;
        const post = await this.postRepository.findById(postId);

        if (!post) throw new AppError('Post não encontrado');

        const comment = new Comment({ content });

        const postComment = new PostComment(post, comment);
        const commentUser = new CommentUser(comment, new User({ id: userId }));

        await this.commentRepository.save(comment);
        await this.commentRepository.saveCommentUser(commentUser);
        await this.postRepository.savePostComment(postComment);

        return comment;
    }
}

export default CreateCommentService;