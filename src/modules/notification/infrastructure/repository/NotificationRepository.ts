import IDataSource from "@common/database/datasource/IDataSource";
import Notification from "@modules/notification/domain/entity/Notification";
import UserNotification from "@modules/notification/domain/entity/UserNotification";
import INotificationRepository from "@modules/notification/domain/repository/INotifcationRepository";

class NotificationRepository implements INotificationRepository {
    constructor(private readonly dataSource: IDataSource<Notification>) { }

    public async save(notification: Notification) {
        return await this.dataSource.store(notification);
    }

    public async saveUserNotification(userNotification: UserNotification): Promise<void> {
        await this.dataSource.createRelationship(userNotification);
    }

    public async list(userId: string): Promise<Notification[]> {
        return await this.dataSource.getQueryBuilder().
            match('(user:User {id: $id})', { id: userId }).
            optional().match('(user)').goOut('h:HAS', 'notification:Notification').
            return('notification{.*}').
            getMany();
    }
}

export default NotificationRepository