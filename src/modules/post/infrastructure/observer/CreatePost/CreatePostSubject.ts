import IObserver from "@common/observer/IObserver";
import ISubject from "@common/observer/ISubject";
import { CreatePostDataObserverType } from "./CreatePostDataType";
import { createPostNotifyCommunityObserver } from "./CreatePostObserver";

class CreatePostSubject implements ISubject {
    private observers: Set<IObserver>;

    constructor (observers?: IObserver[]){
        this.observers = new Set<IObserver>(observers);
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

export const createPostSubject = new CreatePostSubject([ createPostNotifyCommunityObserver ]);