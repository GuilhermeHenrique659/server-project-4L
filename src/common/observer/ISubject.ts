import IObserver from "./IObserver";

export default interface ISubject {
    attach(observer: IObserver): void
    notify(data?: any): Promise<void>
}