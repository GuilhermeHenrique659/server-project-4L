import IObserver from "@common/observer/IObserver";
import SocketConfigurator from "@common/socket/SocketConfigurator";
import { injectable, singleton } from "tsyringe";
import { CreateCommentDTO } from "./CreateCommentDTO";
import CreateNotifcationService from "@modules/notification/domain/service/createNoficationService/CreateNotificationService";
import GetPostOwnerService from "@modules/post/domain/service/getPostOwner/GetPostOwnerService";
import { NotificationMessagesEnum } from "@modules/notification/domain/enum/NotificationMessagesEnum";

@injectable()
class CreateCommentNotificationObserver implements IObserver {
    constructor(private readonly _createNotification: CreateNotifcationService,
        private readonly _getPostOwner: GetPostOwnerService) { }

    public async update({ comment, postId }: CreateCommentDTO): Promise<void> {
        const user = await this._getPostOwner.execute({ postId });

        const notification = await this._createNotification.execute({
            userId: user.id,
            relatedId: postId,
            notificationMessage: NotificationMessagesEnum.POSTCOMMENT
        });

        SocketConfigurator.getInstance().emit('notification/added', { data: notification }, { clientId: user.id });
    }
}

export default CreateCommentNotificationObserver;