import { Repository } from "@common/emun/InjectionsEmun";
import IService from "@common/service/IService";
import { inject, injectable } from "tsyringe";
import INotificationRepository from "../../repository/INotifcationRepository";
import Notification from "../../entity/Notification";

@injectable()
class ListNotificationService implements IService {
    constructor(@inject(Repository.NotificationRepository) private readonly _notificationRepository: INotificationRepository) { }

    public async execute({ userId }: { userId: string }): Promise<Notification[]> {
        return await this._notificationRepository.list(userId);
    }
}

export default ListNotificationService;