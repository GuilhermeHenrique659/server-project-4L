import IService from "@common/service/IService";
import INotificationRepository from "../../repository/INotifcationRepository";
import { CreateNotifcationServiceDTO } from "./CreateNotificationServiceDTO";
import User from "@modules/user/domain/entity/User";
import Notification from "../../entity/Notification";
import UserNotification from "../../entity/UserNotification";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class CreateNotifcationService implements IService {
    constructor(@inject(Repository.NotificationRepository) private readonly _notificationRepository: INotificationRepository) { }

    public async execute({ userId, notificationLink, notificationMessage, relatedId }: CreateNotifcationServiceDTO): Promise<Notification> {
        const user = new User({ id: userId });
        const notification = new Notification(relatedId);
        const userNotification = new UserNotification(user, notification);

        notification.generate_link(notificationLink);
        notification.generate_message(notificationMessage);

        await this._notificationRepository.save(notification);
        await this._notificationRepository.saveUserNotification(userNotification);

        return notification
    }
}

export default CreateNotifcationService;