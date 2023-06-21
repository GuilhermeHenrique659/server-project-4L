import IDataSource from "@common/database/datasource/IDataSource";
import Post from "@modules/post/domain/entity/Post";
import IPostRepository from "@modules/post/domain/repository/IPostRepository";
import Tag from "@modules/tag/domain/entity/Tag";
import User from "@modules/user/domain/entity/User";

export default class PostRepository implements IPostRepository {
    constructor (private readonly _dataSource: IDataSource<Post>) {}

    public async save(post: Post): Promise<Post> {
        return await this._dataSource.store(post);
    }

    public async savePostTag(post: Post, tag: Tag): Promise<void> {
        await this._dataSource.createRelationship(post, 'HAS', tag);
    }
}