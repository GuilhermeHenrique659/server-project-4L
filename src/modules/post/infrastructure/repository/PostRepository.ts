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

    public async listRecommendPost(userId: string, skip: number, limit: number): Promise<Post[]> {
        return await this._dataSource.getQueryBuilder().
            match('(post:Post)').goIn('p:POSTED', 'userPost:User').
            optional().match('(userPost)').goOut('r:AVATAR', 'avatar:File').
            optional().match('(post)').goOut('t:TAGGED', 'postTags:Tag').
            optional().match('(post)').goOut('f:HAS', 'file:File').
            optional().match('(post)').goIn('hl:LIKED', `hu:User {id: '${userId}'}`).
            optional().match('(post)').goIn('l:LIKED', `u:User`).
            with('post, userPost{.*, avatar: avatar{.*}} as user, collect(postTags{.*}) as tags, collect(file{.*}) as files, count(hl) > 0 as hasLike, count(l) as likeCount').
            return('post{.*, user, tags, files, hasLike, likeCount}').
            orderBy('post.createdAt', 'ASC').
            skip(skip).
            limit(limit).
            getMany<Post>('executeRead')
    }
}