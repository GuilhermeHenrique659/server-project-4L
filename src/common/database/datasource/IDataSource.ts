import IEntity from "@common/database/datasource/types/IEntity";
import IQueryBuilder from "./IQueryBuilder";
import { relationType } from "./types/RelationTypes";

interface IDataSource<T extends IEntity> {
    store(entity: T): Promise<T>;
    createRelationship(from: T, relation: string, to: IEntity): Promise<void>;
    findOne(attribute: Partial<T>): Promise<T | undefined>;
    create(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    getQueryBuilder(): IQueryBuilder;
}

export default IDataSource;