import PostServiceFactory from "@modules/post/domain/service/PostServiceFactory";
import PostControllerFactory from "./PostControllerFactory";
import UserRepository from "@modules/user/infrastructure/repository/UserRepository";
import GetDatasource from "@common/helpers/GetDataSource";
import User from "@modules/user/domain/entity/User";
import PostRepository from "../repository/PostRepository";
import Post from "@modules/post/domain/entity/Post";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";
import TagRepository from "@modules/tag/infrastructure/repository/TagRepository";
import Tag from "@modules/tag/domain/entity/Tag";
import GraphRepository from "@modules/graph/infrastructure/repository/GraphRepository";
import Graph from "@modules/graph/domain/entity/Graph";
import GraphServiceFactory from "@modules/graph/domain/service/GraphServiceFactory";
import FileRepository from "@modules/file/infrastructure/repository/FileRepository";
import File from "@modules/file/domain/entity/File";
import LocalFileProvider from "@common/provider/file/LocalFileProvider";
import { likeSubject } from "../observer/LikeSubject";
import CommunityRepository from "@modules/community/infrastructure/repository/CommunityRepository";
import Community from "@modules/community/domain/entity/Community";
import CommunityServiceFactory from "@modules/community/domain/service/CommunityServiceFactory";
import { createPostSubject } from "../observer/CreatePost/CreatePostSubject";


const postRepository = new PostRepository(GetDatasource(Post));
const userRepository = new UserRepository(GetDatasource(User));
const tagRepository = new TagRepository(GetDatasource(Tag));
const communityRepository = new CommunityRepository(GetDatasource(Community));
const graphRepository = new GraphRepository(GetDatasource(Graph));
const fileRepository = new FileRepository(GetDatasource(File));
const fileProvider = new LocalFileProvider();
const graphServiceFactory = new GraphServiceFactory(graphRepository);
const postServiceFactory = new PostServiceFactory(userRepository, postRepository, fileRepository, fileProvider);
const tagServiceFactory = new TagServiceFactory(tagRepository);
const communityServiceFactory = new CommunityServiceFactory(communityRepository, userRepository, fileProvider, fileRepository);
const postControllerFactory = new PostControllerFactory(postServiceFactory, tagServiceFactory, graphServiceFactory, communityServiceFactory, likeSubject, createPostSubject);

export default postControllerFactory;