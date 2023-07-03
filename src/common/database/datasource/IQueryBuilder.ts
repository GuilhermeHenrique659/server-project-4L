import { executeType } from "@common/database/datasource/types/executeTypes";
import IEntity from "./types/IEntity";

export default interface IQueryBuilder {
    query(query: string, params?: object): IQueryBuilder;
    match(pattern: string, params?: object): IQueryBuilder;
    where(condition: string, params?: object): IQueryBuilder;
    goOut(relatationLabel?: string, to?: string): IQueryBuilder;
    goIn(relatationLabel?: string, from?: string): IQueryBuilder;
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