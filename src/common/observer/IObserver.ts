export default interface IObserver {
    update(data?: any): Promise<void>
}