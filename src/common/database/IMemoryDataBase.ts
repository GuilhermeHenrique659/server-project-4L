interface IMemoryDataBase {
    get<T>(key: string): Promise<T | undefined>;
    set<T>(key: string, data: T, ttl?: number): Promise<T>;
    appendUniqueValues<T>(key: string, data: T, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
}