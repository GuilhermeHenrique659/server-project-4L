import IObserver from "@common/observer/IObserver";
import ISubject from "@common/observer/ISubject";
import { injectable, singleton } from "tsyringe";
import { CreateCommentDTO } from "./CreateCommentDTO";

@injectable()
class CreateCommentSubject implements ISubject {
    private observers: Set<IObserver>;

    constructor() {
        this.observers = new Set<IObserver>();
    }

    public attach(observer: IObserver): void {
        this.observers.add(observer);
    }

    public async notify(data?: CreateCommentDTO): Promise<void> {
        console.log(this.observers);
        console.log(this.observers.size);


        for (const observer of this.observers) {
            await observer.update(data);
        }
    }
}

export default CreateCommentSubject;