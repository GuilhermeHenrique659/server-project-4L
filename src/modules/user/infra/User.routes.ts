import { HttpMethods } from "@common/emun/HttpMethod";
import RouterConfigurator from "@common/routes/RouterConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import CreateUserHandle from "./CreateUserHandle";
import CreateUserService from "../domain/service/CreateUserService";
import UserRepository from "../domain/repository/UserRepository";
import DataSourse from "@common/database/repository/DataSource";
import User from "../domain/entity/User";
import { database } from "@common/database/neo4j/DataBase";
import QueryBuilder from "@common/database/repository/QueryBuilder";

const factory = () => {
    return new CreateUserHandle(new CreateUserService(
        new UserRepository(new DataSourse<User>(new QueryBuilder(database.getDriver()), User))
    ))
}


class UserRouter implements IHandleDomain {
    private _routerConfigurator: RouterConfigurator;

    constructor(router: RouterConfigurator) {
        this._routerConfigurator = router;
    }

    public setUpHandles(): void {
        this._routerConfigurator.prefix = 'user',
        this._routerConfigurator.routesConfig = [
            {
                method: HttpMethods.POST,
                path: '/',
                controller: factory()
            }
        ]
    }
    get handle(): RouterConfigurator  {
        return this._routerConfigurator
    }
}

export const userRouter = new UserRouter(new RouterConfigurator())