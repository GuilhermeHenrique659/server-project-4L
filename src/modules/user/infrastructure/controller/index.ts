import User from "@modules/user/domain/entity/User";
import UserRepository from "@modules/user/infrastructure/repository/UserRepository";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import UserControllerFactory from "./UserControllerFactory";
import GetDatasource from "@common/helpers/GetDataSource";
import TagRepository from "@modules/tag/infrastructure/repository/TagRepository";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";
import Tag from "@modules/tag/domain/entity/Tag";
import MockHashProvider from "@common/provider/hash/MockHashProvider";
import AuthenticateProvider from "@common/provider/auth/AuthenticateProvider";
import LocalFileProvider from "@common/provider/file/LocalFileProvider";
import FileRepository from "@modules/file/infrastructure/repository/FileRepository";
import File from "@modules/file/domain/entity/File";

const userRepository = new UserRepository(GetDatasource(User));
const tagRepository = new TagRepository(GetDatasource(Tag));
const tagServices = new TagServiceFactory(tagRepository);
const mockHashProvider = new MockHashProvider();
const authProvider = new AuthenticateProvider();
const fileProvider = new LocalFileProvider();
const fileRepository = new FileRepository(GetDatasource(File))
const userServices = new UserServiceFactory(userRepository, mockHashProvider, authProvider, fileProvider, fileRepository);
export const userControllerFactory = new UserControllerFactory(userServices, tagServices);
