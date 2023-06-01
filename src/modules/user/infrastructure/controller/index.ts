import User from "@modules/user/domain/entity/User";
import UserRepository from "@modules/user/infrastructure/repository/UserRepository";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import UserControllerFactory from "./UserControllerFactory";
import GetDatasource from "@common/helpers/GetDataSource";
import TagRepository from "@modules/tag/infrastructure/repository/TagRepository";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";
import Tag from "@modules/tag/domain/entity/Tag";

const userRepository = new UserRepository(GetDatasource(User));
const tagRepository = new TagRepository(GetDatasource(Tag));
const tagServices = new TagServiceFactory(tagRepository);
const userServices = new UserServiceFactory(userRepository);
export const userControllerFactory = new UserControllerFactory(userServices, tagServices);
