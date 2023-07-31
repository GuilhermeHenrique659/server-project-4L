import IObserver from "@common/observer/IObserver";
import ISubject from "@common/observer/ISubject";
import { LikeDataType } from "./LikeDataType";

class LikeSubject implements ISubject {
    private observers: Set<IObserver>;

    constructor (){
        this.observers = new Set<IObserver>();
    }

    public attach(observer: IObserver): void {
        this.observers.add(observer);
    }

    public async notify(data?: LikeDataType): Promise<void> {        
        this.observers.forEach(async (observer) => {
            await observer.update(data);
        })
    }
}

export const likeSubject = new LikeSubject();