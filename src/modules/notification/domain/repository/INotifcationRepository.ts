import Notification from "../entity/Notification";
import UserNotification from "../entity/UserNotification";

interface INotificationRepository {
    save(notification: Notification): Promise<Notification>;
    saveUserNotification(userNotification: UserNotification): Promise<void>;
    list(userId: string): Promise<Notification[]>;
    delete(id: string): Promise<void>;
}

export default INotificationRepository;