import IObserver from "@common/observer/IObserver";
import ISubject from "@common/observer/ISubject";
import { CreatePostDataObserverType } from "./CreatePostDataType";
import { singleton } from "tsyringe";

@singleton()
class CreatePostSubject implements ISubject {
    private observers: Set<IObserver>;

    constructor() {
        this.observers = new Set<IObserver>();
    }

    public attach(observer: IObserver): void {
        this.observers.add(observer);
    }

    public async notify(data?: CreatePostDataObserverType): Promise<void> {
        this.observers.forEach(async (observer) => {
            await observer.update(data);
        })
    }
}

export default CreatePostSubject;