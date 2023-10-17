import IObserver from "../IObserver";
import ISubject from "../ISubject";

class EmitterSubject implements ISubject {
    private _observers: Set<IObserver>;

    constructor() {
        this._observers = new Set<IObserver>()
    }

    public attach(observer: IObserver): void {
        this._observers.add(observer);
    }

    public clear() {
        this._observers = new Set<IObserver>();
    }

    public async notify(data?: any): Promise<void> {
        for (const observer of this._observers) {
            await observer.update(data);
        }
    }
}

export default EmitterSubject;