import IObserver from "@common/observer/IObserver";
import ISubject from "@common/observer/ISubject";
import { CreatePostDataObserverType } from "./CreatePostDataType";
import { injectable, singleton } from "tsyringe";

@injectable()
class CreatePostSubject implements ISubject {
    private observers: Set<IObserver>;

    constructor() {
        this.observers = new Set<IObserver>();
    }

    public attach(observer: IObserver): void {
        this.observers.add(observer);
    }

    public async notify(data?: CreatePostDataObserverType): Promise<void> {
        for (const observer of this.observers) {
            await observer.update(data);
        }
    }
}

export default CreatePostSubject;