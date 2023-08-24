import IController from "@common/controller/IController";
import AppError from "@common/errors/AppError";
import ValidationError from "@common/errors/ValidationError";
import MiddlewareAdapter from "@common/middleware/MidllewareAdapter";
import { Type } from "@common/types/DecoractorType";
import { MiddlewareInputType } from "@common/types/middlewareInputType";
import { container } from "tsyringe";

export default class SocketAdapterController {
    static async adapter(controller: Type<IController>, { user, ...data }: any, middleware?: MiddlewareInputType) {
        const controllerInput = { data, user };

        try {
            MiddlewareAdapter.run(middleware, controllerInput);

            const controllerOutput = await container.resolve(controller).handle(controllerInput);

            return { data: controllerOutput }
        } catch (err) {
            if (err instanceof AppError) {
                return {
                    error: err,
                }
            } else if (err instanceof ValidationError) {
                return {
                    error: err,
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