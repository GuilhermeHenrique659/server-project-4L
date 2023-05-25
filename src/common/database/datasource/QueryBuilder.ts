import { Driver } from 'neo4j-driver';
import IQueryBuilder from '@common/database/datasource/IQueryBuilder';
import { executeType } from '@common/database/datasource//types/executeTypes';

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
        this._query += '-'
        if (relatation)
            this._query += `[r:${relatation}]`

        this._query += `->${to ? `(${to})` : '()'}`
        return this;
    }

    public goIn(relatation?: string | undefined, from?: string | undefined): IQueryBuilder {
        this._query += '<-'
        if (relatation)
            this._query += `[r:${relatation}]`

        this._query += `-${from ? `(${from})` : '()'}`
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
        this._query += `CREATE (${fromNode})-[r:${relation} ${properties ? this._formatProperties(properties) : ''}]->(${toNode}) `;
        return this;
    }

    public return(...fields: string[]): IQueryBuilder {
        this._query += `RETURN ${fields.join(', ')}`;
        return this;
    }

    public build(): string {
        return this._query.trim();
    }

    public async run<T = any>(execute: executeType = 'executeRead'): Promise<T[] | undefined> {
        console.log(this.build());
        
        const session = this._driver.session();
        try {

            const result = await session[execute](async tx => {
                return await tx.run(this._query, this._queryParams);
            })
            this._clearQuery()
            const data = result.records.map((record) => record.toObject())
            return this._parseObjectInteger64(data).map(({e}) => {
                return {
                    label: e.labels[0],
                    ...e.properties,
                } as T
            })
        } catch (err) {
            console.log(`query fail because:\n ${err}`);
        } finally {
            session.close();
        }
    }

    private _clearQuery() {
        this._query = ''
    }

    private _parseObjectInteger64(obj: any): any[] {
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

    private _formatProperties(properties: object): string {
        return `{${Object.entries(properties).map(([key, value]) => `${key}: $${key}`).join(', ')}}`;
    }
}