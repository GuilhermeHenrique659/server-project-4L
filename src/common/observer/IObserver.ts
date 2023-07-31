export default interface IObserver {
    update<T>(data?: T): Promise<void>
}