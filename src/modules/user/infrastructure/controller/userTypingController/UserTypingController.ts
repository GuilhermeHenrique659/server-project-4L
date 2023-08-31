import IController from "@common/controller/IController";
import { UserTypingControllerInputDTO } from "./UserTypingControllerDTO";
import { ControllerInput } from "@common/types/ControllerIO";
import { injectable } from "tsyringe";
import UserTypingObserver from "../../observers/userTypingObserver/UserTypingObserver";
import UserTypingSubject from "../../observers/userTypingObserver/UserTypingSubject";

@injectable()
class UserTypingController implements IController {
    constructor(private readonly userTypingObserver: UserTypingObserver,
        private readonly userTypingSubject: UserTypingSubject) { }

    public async handle({ data }: ControllerInput<UserTypingControllerInputDTO>): Promise<void> {
        this.userTypingSubject.attach(this.userTypingObserver);
        await this.userTypingSubject.notify(data);
    }
}

export default UserTypingController;