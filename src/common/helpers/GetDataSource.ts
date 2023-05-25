import database from "@config/database/DatabaseConnection";
import DataSourse from "../database/datasource/DataSource";
import QueryBuilder from "../database/datasource/QueryBuilder";
import IEntity from "../database/datasource/types/IEntity";

const GetDatasource = <T extends IEntity>(entity: new ({}) => IEntity) => {
    return new DataSourse<T>(new QueryBuilder(database.getDriver()), entity);
}

export default GetDatasource;