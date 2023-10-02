import { NotificationLinkEnum, NotificationMessagesEnum } from "../../enum/NotificationMessagesEnum";

export type CreateNotifcationServiceDTO = {
    userId: string;
    notificationMessage: NotificationMessagesEnum;
    notificationLink?: NotificationLinkEnum;
    relatedId?: string;
}