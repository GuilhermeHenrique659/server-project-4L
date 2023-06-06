import IController from "@common/controller/IController";
import AppError from "@common/errors/AppError";
import ValidationError from "@common/errors/ValidationError";
import MiddlewareAdapter from "@common/middleware/MidllewareAdapter";
import { MiddlewareInputType } from "@common/types/middlewareInputType";

export default class SocketAdapterController {
    static async adapter(controller: IController, data: any, middleware?: MiddlewareInputType) {     
            const controllerInput = data;

            try {
                MiddlewareAdapter.run(middleware, controllerInput);

                const controllerOutput = await controller.handle(controllerInput);

                return { data: controllerOutput }
            } catch (err) {
                if (err instanceof AppError) {
                    return {
                        error: err.message,
                    }
                } else if (err instanceof ValidationError) {
                    return {
                        error: err.messages,
                    }
                } else {
                    console.log(err);
                    return {
                        message: 'internal server error',
                        error: err
                    }
                }
            }
    }
}