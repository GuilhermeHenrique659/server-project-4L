import IDataSource from "@common/database/datasource/IDataSource";
import User from "../../domain/entity/User";
import IUserRepository from "../../domain/repository/IUserRepository";
import UserAvatar from "@modules/user/domain/entity/UserAvatar";
import UserTags from "@modules/user/domain/entity/UserTags";
import UserPosted from "@modules/user/domain/entity/UserPosted";

class UserRepository implements IUserRepository {
    private readonly _dataSource: IDataSource<User>;

    constructor(dataSource: IDataSource<User>) {
        this._dataSource = dataSource;
    }

    public async save(user: User) {
        return await this._dataSource.store(user);
    }

    public async findByEmail(email: string) {
        return await this._dataSource.getQueryBuilder()
            .match('(u:User {email: $email})', { email })
            .optional().match('(u)')
            .goOut('r:AVATAR', 'file:File')
            .return('u{.*, avatar: file{.*}}')
            .getOne<User>('executeRead');
    }

    public async findById(id: string): Promise<User | undefined> {
        return await this._dataSource.findOne({
            id: id
        })
    }

    public async saveUserPost(userPosts: UserPosted): Promise<void> {
        await this._dataSource.createRelationship(userPosts);
    }

    public async saveTag(userTags: UserTags): Promise<void> {
        await this._dataSource.createRelationship(userTags);
    }
    
    public async saveAvatar(userAvatar: UserAvatar): Promise<void> {
        await this._dataSource.createRelationship(userAvatar);
    }

    public async findUserTag(userId: string, tagId: string): Promise<boolean> {
        const data = await this._dataSource.getQueryBuilder().
            match('(user:User {id: $userId})', { userId}).
            goOut('r:INTEREST', `tag:Tag {id: '${tagId}'}`).
            return('r').
            getMany('executeRead');

        return data.length > 0
    }

    public async removeAvatar(userId: string): Promise<void> {
        await this._dataSource.getQueryBuilder().
            optional().match('(u:User {id: $userId})', { userId }).
            goOut('r:AVATAR', 'file:File').
            delete('r').
            delete('file').
            setData('executeWrite');
    }
}

export default UserRepository;