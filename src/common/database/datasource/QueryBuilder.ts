import { Driver, QueryResult } from 'neo4j-driver';
import IQueryBuilder from '@common/database/datasource/IQueryBuilder';
import { executeType } from '@common/database/datasource//types/executeTypes';
import IEntity from './types/IEntity';

export default class QueryBuilder implements IQueryBuilder {
    private _query: string = '';
    private _queryParams: object;
    private _driver: Driver;

    constructor(drive: Driver) {
        this._driver = drive;
    }

    public query(query: string, params?: object) {
        this._query = query;
        this._queryParams = { ...params };
    }

    public match(pattern: string, params?: object): IQueryBuilder {
        this._query += `MATCH ${pattern} `;
        this._queryParams = { ...this._queryParams, ...params };
        return this;
    }

    public goOut(relatation?: string | undefined, to?: string | undefined): IQueryBuilder {
        this._query += '-';
        if (relatation)
            this._query += `[r:${relatation}]`;

        const toLabel = to ? `(${to})` : '()';
        this._query += `->${toLabel} `;
        return this;
    }

    public goIn(relatation?: string | undefined, from?: string | undefined): IQueryBuilder {
        this._query += '<-';
        if (relatation)
            this._query += `[r:${relatation}]`;

        const fromLabel = from ? `(${from})` : '()';
        this._query += `-${fromLabel} `;
        return this;
    }

    public where(condition: string, params?: object): IQueryBuilder {
        this._query += `WHERE ${condition} `;
        this._queryParams = { ...this._queryParams, ...params };
        return this;
    }

    public set(properties: object): IQueryBuilder {
        this._query += `SET ${Object.entries(properties).map(([key, value]) => `${key} = $${key}`).join(', ')} `;
        this._queryParams = { ...this._queryParams, ...properties };
        return this;
    }

    public create(node: string, properties?: object): IQueryBuilder {
        this._query += `CREATE (e:${node} ${properties ? this._formatProperties(properties) : ''}) `;
        if (properties) this._queryParams = properties;
        return this;
    }

    public createRelation(fromNode: string, relation: string, toNode: string, properties?: object): IQueryBuilder {
        this._query += `CREATE (${fromNode})-[r:${relation}${properties ? this._formatProperties(properties) : ''}]->(${toNode}) `;
        return this;
    }

    public with(pattern: string): IQueryBuilder {
        this._query += `WITH ${pattern} `;
        return this;
    }

    public optional(): IQueryBuilder {
        this._query += `OPTIONAL `;
        return this;
    }

    public delete(pattern: string): IQueryBuilder {
        this._query += `DELETE(${pattern}) `;
        return this
    }

    public return(...fields: string[]): IQueryBuilder {
        this._query += `RETURN ${fields.join(', ')}`;
        return this;
    }

    public build(): string {
        return this._query.trim();
    }

    public async getOne<T = any>(execute: executeType = 'executeRead'): Promise<T | undefined> {
        console.log(this.build());

        const session = this._driver.session();
        try {
            const result = await session[execute](async tx => {
                return await tx.run(this._query, this._queryParams);
            });

            this._clearQuery();
            const [data] = this._normalizeData(result);
            return data;
        } catch (err) {
            console.log(`query fail because:\n ${err}`);
        } finally {
            session.close();
        }
    }

    public async getMany<T = any>(execute: executeType = 'executeRead'): Promise<T[] | undefined> {
        console.log(this.build());

        const session = this._driver.session();
        try {
            const result = await session[execute](async tx => {
                return await tx.run(this._query, this._queryParams);
            });

            this._clearQuery();
            return this._normalizeData(result);
        } catch (err) {
            console.log(`query fail because:\n ${err}`);
        } finally {
            session.close();
        }
    }

    public async setData(execute: executeType = 'executeWrite'): Promise<void> {
        if (execute !== 'executeWrite') throw Error('Use write transaction');

        const session = this._driver.session();
        try {
            await session[execute](async tx => {
                await tx.run(this._query, this._queryParams);
            });
            this._clearQuery();
        } catch (err) {
            console.log(`query fail because:\n ${err}`);
        } finally {
            session.close();
        }
    }

    private _clearQuery() {
        this._query = ''
    }

    private _parseObjectInteger64(obj: any): QueryResult {
        if (typeof obj === 'object') {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const value = obj[key];
                    if (typeof value === 'object' && 'low' in value && 'high' in value) {
                        obj[key] = value.low + (value.high * Math.pow(2, 32));
                    } else if (typeof value === 'object') {
                        obj[key] = this._parseObjectInteger64(value);
                    }
                }
            }
        }
        return obj;
    }

    private _normalizeData(result: QueryResult) {
        return result.records.map((record) => {
            this._parseObjectInteger64(record)
            let data: Record<PropertyKey, unknown> = {};
            const fields = record.keys;

            fields.forEach((field) => {
                const value = record.get(field);
                data = this._normalizeValue(value);
            });
            
            return data as any;
        }
        );
    }

    private _normalizeValue(value: any): any {
        if (Array.isArray(value)) {
            return value.map((item) => this._normalizeValue(item));
        }
        
        return value
    }

    /*     private _normalizeData(result: QueryResult) {
            const data = result.records.map((record) => record.toObject())
            return this._parseObjectInteger64(data).map((item) => {
                console.log(item)
                if (!item) {
                    return;
                }
    
                return {
                    label: item.labels[0],
                    ...item.properties,
                }
            })
        } */

    private _formatProperties(properties: object): string {
        return `{${Object.entries(properties).map(([key, value]) => `${key}: $${key}`).join(', ')}}`;
    }
}