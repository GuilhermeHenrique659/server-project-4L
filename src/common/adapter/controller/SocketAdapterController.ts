import IController from "@common/controller/IController";
import AppError from "@common/errors/AppError";
import ValidationError from "@common/errors/ValidationError";
import ControllerMidleware from "@common/middleware/ControllerMidleware";
import MiddlewareAdapter from "@common/middleware/MidllewareAdapter";
import { Type } from "@common/types/DecoractorType";
import { MiddlewareInputType } from "@common/types/middlewareInputType";

export default class SocketAdapterController {
    static async adapter(controller: Type<IController>, { user, ...data }: any, middleware?: MiddlewareInputType) {
        const controllerInput = { data, user };

        try {
            MiddlewareAdapter.run(middleware, controllerInput);

            const controllerOutput = await ControllerMidleware.run(controller, controllerInput);

            return { data: controllerOutput }
        } catch (err) {
            if (err instanceof AppError) {
                return {
                    error: err,
                }
            } else if (err instanceof ValidationError) {
                return {
                    error: {
                        message: err.message,
                        context: err.context,
                    },
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