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

const postRepository = new PostRepository(GetDatasource(Post));
const userRepository = new UserRepository(GetDatasource(User));
const tagRepository = new TagRepository(GetDatasource(Tag));
const graphRepository = new GraphRepository(GetDatasource(Graph));
const graphServiceFactory = new GraphServiceFactory(graphRepository);
const postServiceFactory = new PostServiceFactory(userRepository, postRepository);
const tagServiceFactory = new TagServiceFactory(tagRepository);
const postControllerFactory = new PostControllerFactory(postServiceFactory, tagServiceFactory, graphServiceFactory);

export default postControllerFactory;