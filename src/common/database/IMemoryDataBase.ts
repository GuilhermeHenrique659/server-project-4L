interface IMemoryDataBase {
    get<T>(key: string): Promise<T | undefined>;
    set<T>(key: string, data: T): Promise<T>;
    delete(key: string): Promise<void>;
}