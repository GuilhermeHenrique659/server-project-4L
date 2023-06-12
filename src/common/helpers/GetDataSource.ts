import database from "@config/database/DatabaseConnection";
import DataSource from "../database/datasource/DataSource";
import QueryBuilder from "../database/datasource/QueryBuilder";
import IEntity from "../database/datasource/types/IEntity";

const GetDatasource = <T extends IEntity>(entity: new (props: Partial<T>) => IEntity) => {
    return new DataSource<T>(new QueryBuilder(database.getDriver()), entity);
}

export default GetDatasource;