import IObserver from "@common/observer/IObserver";
import ISubject from "@common/observer/ISubject";
import { singleton } from "tsyringe";
import { CreateCommentDTO } from "./CreateCommentDTO";

@singleton()
class CreateCommentSubject implements ISubject {
    private observers: Set<IObserver>;

    constructor() {
        this.observers = new Set<IObserver>();
    }

    public attach(observer: IObserver): void {
        this.observers.add(observer);
    }

    public async notify(data?: CreateCommentDTO): Promise<void> {
        this.observers.forEach(async (observer) => {
            await observer.update(data);
        })
    }
}

export default CreateCommentSubject;