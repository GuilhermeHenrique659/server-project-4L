import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import DeleteNotificationService from "@modules/notification/domain/service/deleteNotificationService/DeleteNotificationService";
import { injectable } from "tsyringe";

@injectable()
class DeleteNotificationController implements IController {
    constructor(private readonly deleteNotificationService: DeleteNotificationService) { }

    public async handle({ data }: ControllerInput<{ id: string }>): Promise<ControllerOutput<boolean>> {
        await this.deleteNotificationService.execute({ id: data.id });

        return true
    }
}

export default DeleteNotificationController;