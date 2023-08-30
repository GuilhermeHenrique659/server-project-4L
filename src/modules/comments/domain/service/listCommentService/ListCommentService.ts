import { Repository } from "@common/emun/InjectionsEmun";
import IService from "@common/service/IService";
import { inject, injectable } from "tsyringe";
import ICommentRepository from "../../repository/ICommentRepository";
import Comment from "../../entity/Comment";

@injectable()
class ListCommentService implements IService {
    constructor(@inject(Repository.CommentRepository) public readonly commentRepository: ICommentRepository) { }

    public async execute(data: { postId: string }): Promise<Comment[]> {
        return await this.commentRepository.get(data.postId);
    }
}

export default ListCommentService;