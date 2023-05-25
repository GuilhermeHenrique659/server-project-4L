import database from "@config/database/DatabaseConnection";
import DataSourse from "../database/repository/DataSource";
import QueryBuilder from "../database/repository/QueryBuilder";
import IEntity from "../database/repository/types/IEntity";

const GetDatasource = <T extends IEntity>(entity: new ({}) => IEntity) => {
    return new DataSourse<T>(new QueryBuilder(database.getDriver()), entity);
}

export default GetDatasource;