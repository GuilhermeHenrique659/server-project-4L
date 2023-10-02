import { EntityDateType } from "@common/database/datasource/types/EntityDateType";
import IEntity from "@common/database/datasource/types/IEntity";
import InjectEntityLabel from "@common/helpers/InjectEntityLabel";
import { v4 as uuidv4 } from 'uuid';
import { NotificationLinkEnum, NotificationMessagesEnum } from "../enum/NotificationMessagesEnum";
import User from "@modules/user/domain/entity/User";


@InjectEntityLabel
class Notification implements IEntity {
    public readonly id: string;

    public readonly label: string;

    public message: string;

    public link?: string;

    public user: User;

    public relatedId?: string;

    public readonly createdAt: EntityDateType;

    public readonly updatedAt: EntityDateType;


    constructor(relatedId?: string, id?: string) {
        this.relatedId = relatedId;
        if (!id) {
            this.id = uuidv4();
        }
    }

    public generate_message(notificationEnum: NotificationMessagesEnum) {
        this.message = notificationEnum
    }

    public generate_link(notificationLink?: NotificationLinkEnum) {
        if (!notificationLink) return;
        this.link = notificationLink + this.relatedId;
    }
}

export default Notification;