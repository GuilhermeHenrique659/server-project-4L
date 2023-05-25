import User from "@modules/user/domain/entity/User";
import UserRepository from "@modules/user/domain/repository/UserRepository";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import UserControllerFactory from "./UserControllerFactory";
import GetDatasource from "@common/helpers/GetDataSource";

const userRepository = new UserRepository(GetDatasource(User));
const userServiceFactory = new UserServiceFactory(userRepository);
export const userControllerFactory = new UserControllerFactory(userServiceFactory);
