import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import CreateCommentService from "@modules/comments/domain/service/createCommentService/CreateCommentService";
import { injectable } from "tsyringe";
import { CreateCommentControllerInputDTO, CreateCommentControllerOutputDTO } from "./CreateCommentControllerDTO";
import CreateCommentObserver from "../../obeserver/createCommentObserver/CreateCommentObserver";
import CreateCommentNotificationObserver from "../../obeserver/createCommentObserver/createNotification";
import EmitterSubject from "@common/observer/subject/EmitterSubject";

@injectable()
class CreateCommentController implements IController {
    constructor(private readonly createCommentService: CreateCommentService,
        private readonly emitterSuject: EmitterSubject,
        private readonly createCommentNotification: CreateCommentNotificationObserver,
        private readonly createCommentObserver: CreateCommentObserver) { }

    public async handle({ data, user }: ControllerInput<CreateCommentControllerInputDTO>): Promise<ControllerOutput<CreateCommentControllerOutputDTO>> {
        const { content, postId } = data;
        const userId = user?.id as string;

        const comment = await this.createCommentService.execute({ content, userId, postId });

        this.emitterSuject.attach(this.createCommentObserver);
        this.emitterSuject.attach(this.createCommentNotification)
        await this.emitterSuject.notify({ comment, postId });

        return comment;
    }
}

export default CreateCommentController;