import IDataSource from "@common/database/datasource/IDataSource";
import IQueryBuilder from "@common/database/datasource/IQueryBuilder";
import Comment from "@modules/comments/domain/entity/Comment";
import File from "@modules/file/domain/entity/File";
import Post from "@modules/post/domain/entity/Post";
import PostComment from "@modules/post/domain/entity/PostComment";
import PostFiles from "@modules/post/domain/entity/PostFiles";
import PostTags from "@modules/post/domain/entity/PostTags";
import IPostRepository from "@modules/post/domain/repository/IPostRepository";
import User from "@modules/user/domain/entity/User";
import UserLiked from "@modules/user/domain/entity/UserLiked";

export default class PostRepository implements IPostRepository {
    constructor(private readonly _dataSource: IDataSource<Post>) { }

    private getRecommendationPost(userId: string): IQueryBuilder {
        return this._dataSource.getQueryBuilder().query(`
            MATCH (user:User {id: '${userId}'})-[:INTEREST]->(userTag:Tag)
            OPTIONAL MATCH (user)-[:FOLLOW]->(community:Community)-[:TAGGED]->(communityTag:Tag)
            OPTIONAL MATCH (community)<-[:FOLLOW]-(userCommunity:User)-[:INTEREST]->(userCommunityTag:Tag)
            OPTIONAL MATCH (user)-[:FOLLOW]->(u1: User)-[:INTEREST]->(userFollowingTag:Tag)
            OPTIONAL MATCH (user)-[:LIKED]->(postLiked: Post)-[:TAGGED]->(postLikedTag: Tag)
            MATCH (post:Post)-[:TAGGED]->(postTag:Tag)
            WHERE (postLikedTag)<-[:TAGGED]-(post) OR (userTag)<-[:TAGGED]-(post) 
            OR (communityTag)<-[:TAGGED]-(post) OR (userCommunityTag)<-[:TAGGED]-(post) 
            OR (userFollowingTag)<-[:TAGGED]-(post)
            WITH user, post, COUNT(postTag) AS commonTags
            ORDER BY commonTags
        `)
    }

    private orderByRelevancy(query: IQueryBuilder): void {
        query.query(`
            MATCH (post)
            OPTIONAL MATCH (post)-[:HAS]->(comments:Comment)
            OPTIONAL MATCH (post)<-[:LIKED]-(likes:User)
            WITH post, COUNT(comments) as numComments, COUNT(likes) as numLikes
            ORDER BY post.createdAt DESC, numComments DESC, numLikes DESC
        `)
    }

    public async save(post: Post): Promise<Post> {
        return await this._dataSource.store(post);
    }

    public async savePostTag(postTags: PostTags): Promise<void> {
        await this._dataSource.createRelationship(postTags);
    }

    public async savePostComment(postComment: PostComment): Promise<void> {
        await this._dataSource.createRelationship(postComment);
    }

    public async findById(id: string): Promise<Post | undefined> {
        return await this._dataSource.findOne({ id });
    }

    public async findPostFiles(postId: string): Promise<File[]> {
        return await this._dataSource.getQueryBuilder().
            match('(post: Post {id: $postId})', { postId }).
            optional().match('(post)').goOut('f:HAS', 'file:File').
            return('file{.*, label: labels(file)[0]}').
            getMany();
    }

    public async findPostComments(postId: string): Promise<Comment[]> {
        return await this._dataSource.getQueryBuilder().
            match('(post: Post {id: $postId})', { postId }).
            optional().match('(post)').goOut('f:HAS', 'comment:Comment').
            return('comment{.*, label: labels(comment)[0]}').
            getMany();
    }

    public async hasUserLiked(like: UserLiked): Promise<boolean> {
        return await this._dataSource.hasRelationShip(like);
    }

    public async savePostFile(postFiles: PostFiles): Promise<void> {
        await this._dataSource.createRelationship(postFiles);
    }

    public async saveLike(like: UserLiked): Promise<void> {
        await this._dataSource.createRelationship(like);
    }

    public async findPostOwner(id: string): Promise<User | undefined> {
        return await this._dataSource.getQueryBuilder().
            match('(post:Post { id: $id })', { id }).
            match('(post)').goIn('p:POSTED', 'userPost:User').
            return('userPost{.* }').
            getOne()
    }

    public async listPostCommunity(userId: string, skip: number, limit: number, communityId: string): Promise<Post[]> {
        return await this._dataSource.getQueryBuilder().
            match('(community:Community { id: $id})', { id: communityId }).goOut('i:INSIDE', 'post:Post').
            match('(post)').goIn('p:POSTED', 'userPost:User').
            optional().match('(userPost)').goOut('r:AVATAR', 'avatar:File').
            optional().match('(post)').goOut('t:TAGGED', 'postTags:Tag').
            optional().match('(post)').goOut('f:HAS', 'file:File').
            optional().match('(post)').goIn('hl:LIKED', `hu:User {id: '${userId}'}`).
            optional().match('(post)').goIn('l:LIKED', `u:User`).
            with('post, userPost{name: userPost.name, id: userPost.id, avatar: avatar{.*}} as user, collect(DISTINCT postTags{.*}) as tags, collect(DISTINCT file{.*}) as files, count(DISTINCT hl) > 0 as hasLike, count(DISTINCT l) as likeCount').
            return('post{.*, user, tags, files, hasLike, likeCount}').
            orderBy('post.createdAt', 'DESC').
            skip(skip).
            limit(limit).
            getMany<Post>('executeRead')
    }

    public async listRecommendPost(userId: string, skip: number, limit: number, useAlgorithmic = true): Promise<Post[]> {
        const query = useAlgorithmic ?
            this.getRecommendationPost(userId) :
            this._dataSource.getQueryBuilder().match('(post: Post)');

        if (useAlgorithmic)
            this.orderByRelevancy(query);

        return await query.
            match('(post)').goIn('p:POSTED', 'userPost:User').
            optional().match('(userPost)').goOut('r:AVATAR', 'avatar:File').
            optional().match('(post)').goOut('t:TAGGED', 'postTags:Tag').
            optional().match('(post)').goOut('f:HAS', 'file:File').
            optional().match('(post)').goIn('hl:LIKED', `hu:User {id: '${userId}'}`).
            optional().match('(post)').goIn('l:LIKED', `u:User`).
            optional().match('(post)').goIn('c:INSIDE', 'community:Community').
            optional().match('(community)').goOut('fc:AVATAR', 'cAvatar:File').
            with(
                `post, userPost{name: userPost.name, id: userPost.id, avatar: avatar{.*}} as user, 
                collect(DISTINCT postTags{.*}) as tags, collect(DISTINCT file{.*}) as files, 
                count(DISTINCT hl) > 0 as hasLike, count(DISTINCT l) as likeCount, 
                community{.*, avatar: cAvatar{.*}} as community`
                ).
            return('post{.*, user, tags, files, hasLike, likeCount, community}').
            orderBy('post.createdAt', 'DESC').
            skip(skip).
            limit(limit).
            getMany<Post>('executeRead')
    }

    public async remove(id: string): Promise<void> {
        await this._dataSource.remove(id);
    }
}