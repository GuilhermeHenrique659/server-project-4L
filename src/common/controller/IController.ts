import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";

export default interface IController {
    handle(payload: ControllerInput<any>): Promise<ControllerOutput<any>>
}