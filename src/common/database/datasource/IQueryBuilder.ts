import { executeType } from "@common/database/repository//types/executeTypes";
import IEntity from "./types/IEntity";

export default interface IQueryBuilder {
    query(query: string): void;
    match(pattern: string, params?: object): IQueryBuilder;
    where(condition: string, params?: object): IQueryBuilder;
    goOut(relatationLabel?: string, to?: string): IQueryBuilder;
    goIn(relatationLabel?: string, from?: string): IQueryBuilder;
    set(properties: object): IQueryBuilder;
    create(node: string, properties?: object): IQueryBuilder;
    createRelation(fromNode: string, relation: string, toNode: string, properties?: object): IQueryBuilder;
    return(...fields: string[]): IQueryBuilder;
    build(): string;
    run<T extends IEntity>(execute?: executeType): Promise<T[] | undefined>;
  }