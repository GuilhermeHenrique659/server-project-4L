import IDataSource from "@common/database/datasource/IDataSource";
import Post from "@modules/post/domain/entity/Post";
import PostFiles from "@modules/post/domain/entity/PostFiles";
import PostTags from "@modules/post/domain/entity/PostTags";
import IPostRepository from "@modules/post/domain/repository/IPostRepository";
import UserLiked from "@modules/user/domain/entity/UserLiked";

export default class PostRepository implements IPostRepository {
    constructor(private readonly _dataSource: IDataSource<Post>) { }

    public async save(post: Post): Promise<Post> {
        return await this._dataSource.store(post);
    }

    public async savePostTag(postTags: PostTags): Promise<void> {
        await this._dataSource.createRelationship(postTags);
    }

    public async findById(id: string): Promise<Post | undefined> {
        return await this._dataSource.findOne({ id });
    }

    public async savePostFile(postFiles: PostFiles): Promise<void> {
        await this._dataSource.createRelationship(postFiles);
    }

    public async saveLike(like: UserLiked): Promise<void> {
        await this._dataSource.createRelationship(like);
    }

    public async listRecommendPost(userId: string): Promise<Post[]> {
        return await this._dataSource.getQueryBuilder().query(`
        MATCH (user:User  {id: "${userId}"})
        CALL gds.pageRank.stream("${userId}", {
          maxIterations: 100,
          dampingFactor: 0.85,
          sourceNodes: [user]
        })
        YIELD nodeId, score
        WITH gds.util.asNode(nodeId) as node, nodeId, score
        WHERE labels(gds.util.asNode(nodeId))[0] = 'Post'
        MATCH (node)<-[:POSTED]-(user:User)
        MATCH (node)-[:TAGGED]->(postTag:Tag)
        WHERE NOT user.id = $userId
        WITH user{.*, label: labels(user)[0] } as user, node{.*, label: labels(node)[0]} as post, collect(postTag{.*}) as tags, score
        RETURN post{.*,user: user, tags: tags, score}
        ORDER BY score DESC
        `, {userId}).getMany('executeRead');
    }
}