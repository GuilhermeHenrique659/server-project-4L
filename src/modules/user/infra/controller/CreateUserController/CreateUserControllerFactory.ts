import CreateUserController from "./CreateUserController"
import UserRepository from "@modules/user/domain/repository/UserRepository"
import User from "@modules/user/domain/entity/User"
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory"
import GetDatasource from "@common/helpers/GetDataSource"

const CreateUserControllerFactory = () => {
    const userRepository = new UserRepository(GetDatasource(User));
    const userServices = new UserServiceFactory(userRepository);
    return new CreateUserController(userServices);
}

export default CreateUserControllerFactory