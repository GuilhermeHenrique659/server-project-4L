import { executeType } from "@common/database/datasource/types/executeTypes";
import IEntity from "./types/IEntity";

export type direction = 'ASC' | 'DESC'

export default interface IQueryBuilder {
    query(query: string, params?: object): IQueryBuilder;
    match(pattern: string, params?: object): IQueryBuilder;
    where(condition: string, params?: object): IQueryBuilder;
    goOut(relatationLabel?: string, to?: string, params?: object): IQueryBuilder;
    goIn(relatationLabel?: string, from?: string, params?: object): IQueryBuilder;
    orderBy(query: string, direction: direction): IQueryBuilder;
    limit(limit: number): IQueryBuilder;
    skip(skip: number): IQueryBuilder;
    set(properties: object): IQueryBuilder;
    with(pattern: string): IQueryBuilder;
    optional(): IQueryBuilder;
    delete(pattern: string): IQueryBuilder;
    create(node: string, properties?: object): IQueryBuilder;
    createRelation(fromNode: string, relation: string, toNode: string, properties?: object): IQueryBuilder;
    return(...fields: string[]): IQueryBuilder;
    build(): string;
    getMany<T = any>(execute?: executeType): Promise<T[]>;
    getOne<T = any>(execute?: executeType): Promise<T | undefined>;
    setData(execute?: executeType): Promise<void>;
  }