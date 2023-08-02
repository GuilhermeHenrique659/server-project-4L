import CommunityServiceFactory from "@modules/community/domain/service/CommunityServiceFactory";
import CommunityControllerFactory from "./CommunityControllerFactory";
import CommunityRepository from "../repository/CommunityRepository";
import GetDatasource from "@common/helpers/GetDataSource";
import Community from "@modules/community/domain/entity/Community";
import UserRepository from "@modules/user/infrastructure/repository/UserRepository";
import User from "@modules/user/domain/entity/User";
import PostServiceFactory from "@modules/post/domain/service/PostServiceFactory";
import FileRepository from "@modules/file/infrastructure/repository/FileRepository";
import LocalFileProvider from "@common/provider/file/LocalFileProvider";
import PostRepository from "@modules/post/infrastructure/repository/PostRepository";
import Post from "@modules/post/domain/entity/Post";
import File from "@modules/file/domain/entity/File";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import MockHashProvider from "@common/provider/hash/MockHashProvider";
import AuthenticateProvider from "@common/provider/auth/AuthenticateProvider";


const communityRepository = new CommunityRepository(GetDatasource(Community));
const postRepository = new PostRepository(GetDatasource(Post));
const userRepository = new UserRepository(GetDatasource(User));
const fileRepository = new FileRepository(GetDatasource(File));
const mockHashProvider = new MockHashProvider();
const authProvider = new AuthenticateProvider();
const fileProvider = new LocalFileProvider();
const controllerServiceFactory = new CommunityServiceFactory(communityRepository, userRepository)
const postServiceFactory = new PostServiceFactory(userRepository, postRepository, fileRepository, fileProvider);
const userServiceFactory = new UserServiceFactory(userRepository, mockHashProvider, authProvider, fileProvider, fileRepository);
const communityControllerFactory = new CommunityControllerFactory(controllerServiceFactory, postServiceFactory, userServiceFactory);
export default communityControllerFactory;