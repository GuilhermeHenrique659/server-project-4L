import IController from "@common/controller/IController";
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods";
import AppError from "@common/errors/AppError";
import { ControllerInput } from "@common/types/ControllerIO";
import { Request, Response } from "express";

export default class ExpressAdapterController {
    static adapter(controller: IController, statusResponse: HttpReturnMethods) {
        return async (request: Request, response: Response) => {            
            const controllerInput: ControllerInput = { ...request.body, ...request.params, ...request.query }
            try {
                const controllerOutput = await controller.handle(controllerInput);
                return response.status(statusResponse).json({ data: controllerOutput });
            } catch (err) {
                if (err instanceof AppError) {
                    return response.status(err.statusCode ?? 500).send({ error: err.message});
                } else {
                    console.log(err);
                    return response.status(500).send({ error: err });
                }
            }
        };
    }
}