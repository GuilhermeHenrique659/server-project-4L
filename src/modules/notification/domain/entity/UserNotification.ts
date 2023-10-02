import IEdge from "@common/database/datasource/types/IEdge";
import IEntity from "@common/database/datasource/types/IEntity";
import User from "@modules/user/domain/entity/User";
import Notification from "./Notification";

class UserNotification implements IEdge {
    public readonly from?: User;

    public readonly label: string;

    public readonly to?: Notification;


    constructor(from?: User, to?: Notification) {
        this.from = from;
        this.to = to;

        this.label = 'HAS'
    }
}

export default UserNotification;