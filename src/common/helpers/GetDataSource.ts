import DataSource from "../database/datasource/DataSource";
import QueryBuilder from "../database/datasource/QueryBuilder";
import IEntity from "../database/datasource/types/IEntity";
import { Transaction } from "neo4j-driver";

const GetDatasource = <T extends IEntity>(entity: new (props: Partial<T>) => IEntity, tx: Transaction) => {
    return new DataSource<T>(new QueryBuilder(tx), entity);
}

export default GetDatasource;