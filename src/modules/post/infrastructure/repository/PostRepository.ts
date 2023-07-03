import IDataSource from "@common/database/datasource/IDataSource";
import Post from "@modules/post/domain/entity/Post";
import PostTags from "@modules/post/domain/entity/PostTags";
import IPostRepository from "@modules/post/domain/repository/IPostRepository";

export default class PostRepository implements IPostRepository {
    constructor(private readonly _dataSource: IDataSource<Post>) { }

    public async save(post: Post): Promise<Post> {
        return await this._dataSource.store(post);
    }

    public async savePostTag(postTags: PostTags): Promise<void> {
        await this._dataSource.createRelationship(postTags);
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
        WHERE NOT user.id = $userId
        WITH user{.*, label: labels(node)[0] } as user, gds.util.asNode(nodeId) as node, score, labels(gds.util.asNode(nodeId))[0] as label
        RETURN node{.*, label: label ,user: user}
        ORDER BY score DESC
        `, {userId}).getMany('executeRead');
    }
}