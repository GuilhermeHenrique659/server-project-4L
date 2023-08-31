import IObserver from "@common/observer/IObserver";
import ISubject from "@common/observer/ISubject";
import { UserTypingControllerInputDTO } from "../../controller/userTypingController/UserTypingControllerDTO";
import { singleton } from "tsyringe";

@singleton()
class UserTypingSubject implements ISubject {
    private readonly observers: Set<IObserver>;

    constructor() {
        this.observers = new Set();
    }

    public attach(observer: IObserver): void {
        this.observers.add(observer);
    }

    public async notify(data?: UserTypingControllerInputDTO): Promise<void> {
        for (const observer of this.observers) {
            await observer.update(data)
        }
    }
}

export default UserTypingSubject