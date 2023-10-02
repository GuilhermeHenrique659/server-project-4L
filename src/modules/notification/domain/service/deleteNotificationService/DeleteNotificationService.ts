import { Repository } from "@common/emun/InjectionsEmun";
import IService from "@common/service/IService";
import { inject, injectable } from "tsyringe";
import INotificationRepository from "../../repository/INotifcationRepository";

@injectable()
class DeleteNotificationService implements IService {
    constructor(@inject(Repository.NotificationRepository) private readonly _notificationRepository: INotificationRepository) { }

    public async execute({ id }: { id: string }) {
        await this._notificationRepository.delete(id);
    }
}

export default DeleteNotificationService;