import IController from "@common/controller/IController";
import Injection from "@common/helpers/InjectionContainer";
import LocalFileProvider from "@common/provider/file/LocalFileProvider";
import S3FileProvider from "@common/provider/file/S3FileProvider";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import { Type } from "@common/types/DecoractorType";
import database from "@config/database/DatabaseConnection";
import { Neo4jError } from "neo4j-driver";


class ControllerMidleware {
    static async run(controller: Type<IController>, payload: ControllerInput<any>): Promise<ControllerOutput<any>> {
        const session = database.getDriver().session();
        const tx = session.beginTransaction();
        console.log(`Run Controller ${controller.name}`);

        const fileProvider = new S3FileProvider();
        try {

            const response = await Injection.resolve(controller, fileProvider, tx).handle(payload);

            await tx.commit();

            return response;
        } catch (err) {
            await fileProvider.rollback();

            if (err instanceof Neo4jError) {
                if (err.retriable) {
                    const response = await Injection.resolve(controller, fileProvider, tx).handle(payload);

                    await tx.commit();

                    return response
                } else {
                    console.log(`Query fail: ${err.message}`);
                }
            }

            await tx.rollback();

            throw err;
        } finally {
            await tx.close()
            await session.close()
        }
    }
}

export default ControllerMidleware;