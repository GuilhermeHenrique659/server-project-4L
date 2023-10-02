import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import Notification from "@modules/notification/domain/entity/Notification";
import ListNotificationService from "@modules/notification/domain/service/listNotifcationService/ListNotificationService";
import { injectable } from "tsyringe";

@injectable()
class ListNotificationController implements IController {
    constructor(private readonly _listNotificationService: ListNotificationService) { }

    public async handle({ user }: ControllerInput<void>): Promise<ControllerOutput<Notification[]>> {
        const userId = user?.id as string;
        return await this._listNotificationService.execute({ userId });
    }
}

export default ListNotificationController;