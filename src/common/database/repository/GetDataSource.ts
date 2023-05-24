import { database } from "../neo4j/DataBase";
import DataSourse from "./DataSource";
import QueryBuilder from "./QueryBuilder";
import IEntity from "./types/IEntity";

const GetDatasource = <T extends IEntity>(entity: new ({}) => IEntity) => {
    return new DataSourse<T>(new QueryBuilder(database.getDriver()), entity);
}

export default GetDatasource;