import IController from "@common/controller/IController";
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods";
import { ControllerInput } from "@common/types/ControllerIO";
import { Request, Response } from "express";

export default class ExpressAdapterController {
    static adapter(controller: IController, statusResponse: HttpReturnMethods) {
        return async (request: Request, response: Response) => {            
            const controllerInput: ControllerInput = { ...request.body, ...request.params, ...request.query }

            const controllerOutput = await controller.handle(controllerInput);
            return response.status(statusResponse).json({ data: controllerOutput });
        };
    }
}