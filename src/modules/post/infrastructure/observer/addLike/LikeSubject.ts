import IObserver from "@common/observer/IObserver";
import ISubject from "@common/observer/ISubject";
import { LikeDataType } from "./LikeDataType";
import { injectable, singleton } from "tsyringe";

@injectable()
class LikeSubject implements ISubject {
    private observers: Set<IObserver>;

    constructor() {
        this.observers = new Set<IObserver>();
    }

    public attach(observer: IObserver): void {
        this.observers.add(observer);
    }

    public async notify(data?: LikeDataType): Promise<void> {
        for (const subject of this.observers) {
            await subject.update(data);
        }
    }
}

export default LikeSubject;