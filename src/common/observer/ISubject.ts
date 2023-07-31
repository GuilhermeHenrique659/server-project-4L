import IObserver from "./IObserver";

export default interface ISubject {
    attach(observer: IObserver): void
    notify<T>(data?: T): Promise<void>
}