import IEntity from "@common/database/datasource/types/IEntity";
import IQueryBuilder from "./IQueryBuilder";
import { relationType } from "./types/RelationTypes";
import IEdge from "./types/IEdge";

interface IDataSource<T extends IEntity> {
    store(entity: T): Promise<T>;
    createRelationship(edge: IEdge): Promise<void>;
    findOne(attribute: Partial<T>): Promise<T | undefined>;
    hasRelationShip(edge: IEdge): Promise<boolean>;
    create(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    getQueryBuilder(): IQueryBuilder;
}

export default IDataSource;