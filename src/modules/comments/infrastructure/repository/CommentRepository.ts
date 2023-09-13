import IDataSource from "@common/database/datasource/IDataSource";
import Comment from "@modules/comments/domain/entity/Comment";
import CommentUser from "@modules/comments/domain/entity/CommentUser";
import ICommentRepository from "@modules/comments/domain/repository/ICommentRepository";

class CommentRepository implements ICommentRepository {
    constructor(private readonly _dataSource: IDataSource<Comment>) { }

    public async save(comment: Comment): Promise<Comment> {
        return await this._dataSource.store(comment);
    }

    public async saveCommentUser(commentUser: CommentUser): Promise<void> {
        await this._dataSource.createRelationship(commentUser);
    }

    public async get(postId: string): Promise<Comment[]> {
        return await this._dataSource.getQueryBuilder().
            match('(post:Post {id: $id})', { id: postId }).
            optional().match('(post)').goOut('h:HAS', 'comment:Comment').
            optional().match('(comment)').goOut('w:WRITED_BY', 'user:User').
            optional().match('(user)').goOut('a:AVATAR', 'file:File').
            with('comment, user{name: user.name, id: user.id, avatar: file{.*}} as user').
            return('comment{.*, user}').
            getMany();
    }

    public async remove(id: string): Promise<void> {
        await this._dataSource.remove(id);
    }
}

export default CommentRepository;