import DataBase from "@common/database/neo4j/DataBase";
import ConfigEnv from "@config/env/ConfigEnv";

const database = new DataBase(ConfigEnv.getDBConnection())
export default database;
