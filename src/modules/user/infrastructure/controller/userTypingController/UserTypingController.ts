import IController from "@common/controller/IController";
import { UserTypingControllerInputDTO } from "./UserTypingControllerDTO";
import { ControllerInput } from "@common/types/ControllerIO";
import { injectable } from "tsyringe";
import UserTypingObserver from "../../observers/userTypingObserver/UserTypingObserver";
import EmitterSubject from "@common/observer/subject/EmitterSubject";

@injectable()
class UserTypingController implements IController {
    constructor(private readonly userTypingObserver: UserTypingObserver,
        private readonly _emitterSubject: EmitterSubject) { }

    public async handle({ data }: ControllerInput<UserTypingControllerInputDTO>): Promise<void> {
        this._emitterSubject.attach(this.userTypingObserver);
        await this._emitterSubject.notify(data);
    }
}

export default UserTypingController;