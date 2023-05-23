import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import { TestRepository } from "./repository";
import Person from "./Person";
import DataSourse from "@common/database/repository/DataSource";
import QueryBuilder from "@common/database/repository/QueryBuilder";
import { database } from "@common/database/neo4j/DataBase";

class Controller implements IController {
    async handle(payload: ControllerInput<{id: string}>): Promise<{test: Person}> {
        
        const person = await new TestRepository(new DataSourse<Person>(new QueryBuilder(database.getDriver()), 'Person')).find(payload.id)

        return {
            test: person
        }
    }
}

export default Controller