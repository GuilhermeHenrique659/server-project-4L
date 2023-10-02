import Notification from "../entity/Notification";
import UserNotification from "../entity/UserNotification";

interface INotificationRepository {
    save(notification: Notification): Promise<Notification>;
    saveUserNotification(userNotification: UserNotification): Promise<void>;
    list(userId: string): Promise<Notification[]>
}

export default INotificationRepository;