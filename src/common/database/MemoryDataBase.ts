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

    async appendUniqueValues<T>(key: string, data: T): Promise<void> {
        const set = this._database.get<Set<T>>(key);
        if(!set) {
            this._database.set(key, new Set<T>([data]));
        } else {
            set.add(data);
            this._database.set(key, set);
        }
    }

    async delete(key: string): Promise<void> {
        this._database.del(key)
    }
}

export const nodeCacheDataBase = new NodeCacheDataBase()