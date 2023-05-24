import IController from "@common/controller/IController";
import AppError from "@common/errors/AppError";

export default class SocketAdapterController {
    static async adapter(controller: IController, data: any) {     
            const controllerInput = data;
            try {
                const controllerOutput = await controller.handle(controllerInput);

                return { data: controllerOutput }
            } catch (err) {
                if (err instanceof AppError) {
                    return {
                        error: err.message,
                    }
                } else {
                    return {
                        message: 'internal server error',
                        error: err
                    }
                }
            }
    }
}