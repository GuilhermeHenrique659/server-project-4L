import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";

export default interface IController {
    handle(payload: ControllerInput): Promise<ControllerOutput>
}