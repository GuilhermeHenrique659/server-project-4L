import CreateUserService from "@modules/user/domain/service/createUser/CreateUserService"
import CreateUserController from "./CreateUserController"
import UserRepository from "@modules/user/domain/repository/UserRepository"
import User from "@modules/user/domain/entity/User"
import GetDatasource from "@common/database/repository/GetDataSource"

const CreateUserControllerFactory = () => {
    const userRepository = new UserRepository(GetDatasource(User))
    const createUserService = new CreateUserService(userRepository) 
    return new CreateUserController(createUserService)
}

export default CreateUserControllerFactory