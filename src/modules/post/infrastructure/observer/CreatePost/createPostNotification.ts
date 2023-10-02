import IObserver from "@common/observer/IObserver";
import SocketConfigurator from "@common/socket/SocketConfigurator";
import { CreatePostDataObserverType } from "./CreatePostDataType";
import { injectable, singleton } from "tsyringe";
import CreateNotifcationService from "@modules/notification/domain/service/createNoficationService/CreateNotificationService";
import GetCommunityFollowersService from "@modules/community/domain/service/GetCommunityFollwersService/GetCommunityFollowersService";
import { NotificationMessagesEnum } from "@modules/notification/domain/enum/NotificationMessagesEnum";

@injectable()
class CreatePostNotificationObserver implements IObserver {
    constructor(
        private readonly getCommunityFollowers: GetCommunityFollowersService,
        private readonly createNotification: CreateNotifcationService
    ) { }

    public async update({ communityId }: CreatePostDataObserverType): Promise<void> {
        const userIds = await this.getCommunityFollowers.execute({ communityId });

        for (const userId of userIds) {
            const notification = await this.createNotification.execute({
                userId,
                relatedId: communityId,
                notificationMessage: NotificationMessagesEnum.POSTCOMMUNITYADDED
            });

            SocketConfigurator.getInstance().emit('notification/added', { data: notification }, { clientId: userId });
        }

    }
}

export default CreatePostNotificationObserver