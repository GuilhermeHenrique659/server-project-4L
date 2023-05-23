import NodeCache from "node-cache";

class NodeCacheDataBase implements IMemoryDataBase {
    private readonly _database: NodeCache

    constructor () {
        this._database = new NodeCache()
    }

    async get<T>(key: string): Promise<T | undefined> {
        return this._database.get(key);
    }

    async set<T>(key: string, data: T): Promise<T> {
        await this._database.set(key, data)
        return data;
    }

    async delete(key: string): Promise<void> {
        await this._database.del(key)
    }
}

export const nodeCacheDataBase = new NodeCacheDataBase()