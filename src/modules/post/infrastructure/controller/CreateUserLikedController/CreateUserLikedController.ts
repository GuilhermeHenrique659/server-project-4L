import IController from "@common/controller/IController";
import AppError from "@common/errors/AppError";
import { ControllerInput } from "@common/types/ControllerIO";
import { injectable } from "tsyringe";
import CreatePostLikedService from "@modules/post/domain/service/CreatePostLikedService/CreatePostLikedService";
import BroadcastLikeObserver from "../../observer/addLike/BroadcastLikeObserver";
import CreateNotifcationSubject from "../../observer/addLike/createNotification";
import EmitterSubject from "@common/observer/subject/EmitterSubject";

@injectable()
class CreatePostLikedController implements IController {
    constructor(private readonly _createPostLiked: CreatePostLikedService,
        private readonly _emitterSubject: EmitterSubject,
        private readonly _createNotificationSubject: CreateNotifcationSubject,
        private readonly _broadcastLikeObserver: BroadcastLikeObserver) { }

    public async handle({ data, user }: ControllerInput<{ postId: string }>): Promise<boolean> {
        const { postId } = data;

        if (!user) throw new AppError('Usuario não autenticado');

        await this._createPostLiked.execute({
            userId: user?.id,
            postId
        });

        this._emitterSubject.attach(this._broadcastLikeObserver);
        this._emitterSubject.attach(this._createNotificationSubject);
        await this._emitterSubject.notify({
            userId: user.id,
            postId
        })

        return true
    }
}

export default CreatePostLikedController;