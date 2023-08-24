import IController from "@common/controller/IController";
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods";
import AppError from "@common/errors/AppError";
import ValidationError from "@common/errors/ValidationError";
import MiddlewareAdapter from "@common/middleware/MidllewareAdapter";
import { ControllerInput } from "@common/types/ControllerIO";
import { Type } from "@common/types/DecoractorType";
import { MiddlewareInputType } from "@common/types/middlewareInputType";
import { Request, Response } from "express";
import container from "@common/helpers/InjectionContainer";

export default class ExpressAdapterController {
    static adapter(controller: Type<IController>, statusResponse: HttpReturnMethods, middleware?: MiddlewareInputType) {
        return async (request: Request, response: Response) => {
            const controllerInput: ControllerInput<any> = { data: { ...request.body, ...request.params, ...request.query } }
            try {

                MiddlewareAdapter.run(middleware, controllerInput, request.headers.authorization);

                const controllerOutput = await container.resolve(controller).handle(controllerInput);
                return response.status(statusResponse).json({ data: controllerOutput });

            } catch (err) {

                if (err instanceof AppError) {
                    return response.status(err.statusCode ?? 500).send({ error: err });

                } else if (err instanceof ValidationError) {
                    return response.status(err.statusCode).send({ error: { message: err.message, context: err.context } })

                } else {
                    console.log(err);
                    return response.status(500).send({ error: err });
                }
            }
        };
    }
}