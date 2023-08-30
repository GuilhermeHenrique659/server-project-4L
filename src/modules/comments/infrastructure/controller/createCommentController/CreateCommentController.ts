import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import CreateCommentService from "@modules/comments/domain/service/createCommentService/CreateCommentService";
import { injectable } from "tsyringe";
import { CreateCommentControllerInputDTO } from "./CreateCommentControllerDTO";
import Comment from "@modules/comments/domain/entity/Comment";
import CreateCommentSubject from "../../obeserver/createCommentObserver/CreateCommentSubject";
import CreateCommentObserver from "../../obeserver/createCommentObserver/CreateCommentObserver";

@injectable()
class CreateCommentController implements IController {
    constructor(private readonly createCommentService: CreateCommentService,
        private readonly createCommentSubject: CreateCommentSubject,
        private readonly createCommentObserver: CreateCommentObserver) { }

    public async handle({ data, user }: ControllerInput<CreateCommentControllerInputDTO>): Promise<ControllerOutput<Comment>> {
        const { content, postId } = data;
        const userId = user?.id as string;

        const comment = await this.createCommentService.execute({ content, userId, postId });

        this.createCommentSubject.attach(this.createCommentObserver);
        await this.createCommentSubject.notify({ comment, postId });

        return comment;
    }
}

export default CreateCommentController;