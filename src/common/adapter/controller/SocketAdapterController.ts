import IController from "@common/controller/IController";

export default class SocketAdapterController {
    static async adapter(controller: IController, data: any) {     
            const controllerInput = data;     
            const controllerOutput = await controller.handle(controllerInput);
            return { data: controllerOutput }
    }
}