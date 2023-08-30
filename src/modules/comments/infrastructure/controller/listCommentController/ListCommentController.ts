import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import Comment from "@modules/comments/domain/entity/Comment";
import ListCommentService from "@modules/comments/domain/service/listCommentService/ListCommentService";
import { injectable } from "tsyringe";


@injectable()
class ListCommentController implements IController {
    constructor(private readonly listCommentService: ListCommentService) { }

    public async handle({ data }: ControllerInput<{ postId: string }>): Promise<ControllerOutput<Comment[]>> {
        const comments = await this.listCommentService.execute(data);

        return comments;
    }
}

export default ListCommentController;