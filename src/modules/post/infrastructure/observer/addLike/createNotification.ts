import IObserver from "@common/observer/IObserver";
import SocketConfigurator from "@common/socket/SocketConfigurator";
import { NotificationMessagesEnum } from "@modules/notification/domain/enum/NotificationMessagesEnum";
import CreateNotifcationService from "@modules/notification/domain/service/createNoficationService/CreateNotificationService";
import GetPostOwnerService from "@modules/post/domain/service/getPostOwner/GetPostOwnerService";
import { LikeDataType } from '@modules/post/infrastructure/observer/addLike/LikeDataType'
import { injectable, singleton } from "tsyringe";

@injectable()
class CreateNotifcationSubject implements IObserver {
    constructor(private readonly _createNotification: CreateNotifcationService,
        private readonly _getPostOwner: GetPostOwnerService) { }

    public async update({ postId }: LikeDataType): Promise<void> {
        const user = await this._getPostOwner.execute({ postId });

        const notification = await this._createNotification.execute({
            userId: user.id,
            relatedId: postId,
            notificationMessage: NotificationMessagesEnum.POSTLIKEDADDED
        });

        SocketConfigurator.getInstance().emit('notification/added', { data: notification }, { clientId: user.id });
    }
}

export default CreateNotifcationSubject;