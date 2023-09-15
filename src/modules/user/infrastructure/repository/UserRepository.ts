import IDataSource from "@common/database/datasource/IDataSource";
import User from "../../domain/entity/User";
import IUserRepository from "../../domain/repository/IUserRepository";
import UserAvatar from "@modules/user/domain/entity/UserAvatar";
import UserTags from "@modules/user/domain/entity/UserTags";
import UserPosted from "@modules/user/domain/entity/UserPosted";
import UserCommunity from "@modules/user/domain/entity/UserCommunity";
import IEdge from "@common/database/datasource/types/IEdge";
import UserFollow from "@modules/user/domain/entity/UserFollow";

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

    public async findByIdWithAvatar(id: string, isFolling = false, currentUserId?: string): Promise<User | undefined> {

        const query = await this._dataSource.getQueryBuilder()
            .match('(u:User {id: $id})', { id })
            .optional().match('(u)')
            .goOut('r:AVATAR', 'file:File')

        if (isFolling && currentUserId) query.query(`OPTIONAL MATCH (u)-[f:FOLLOW]-(u1 {id: "${currentUserId}"}) `);

        return query
            .with(`u{.*} as user, labels(u)[0] as label , file{.*} as avatar ${isFolling ? ', count(DISTINCT f) > 0 as hasFollowing' : ''}`)
            .return(`user{.*, label, avatar${isFolling ? ', hasFollowing' : ' '}}`)
            .getOne<User>('executeRead');
    }

    public async findByIdCompleteData(id: string): Promise<User | undefined> {
        return await this._dataSource.getQueryBuilder()
            .match('(u:User {id: $id})', { id })
            .optional().match('(u)')
            .goOut('r:AVATAR', 'file:File')
            .optional().match('(u)')
            .goOut('i:INTEREST', 'tag:Tag')
            .with('u, file{.*} as avatar, COLLECT(tag{.*}) as tags')
            .return('u{.*, label: labels(u)[0], avatar, tags}')
            .getOne<User>('executeRead');
    }

    public async findById(id: string): Promise<User | undefined> {
        return await this._dataSource.findOne({
            id: id
        })
    }

    public async hasFollowingCommunity(userCommunity: UserCommunity): Promise<boolean> {
        return await this._dataSource.hasRelationShip(userCommunity)
    }

    public async hasRelation(userOwner: IEdge): Promise<boolean> {
        return await this._dataSource.hasRelationShip(userOwner);
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

    public async saveUserFollow(userFollow: UserFollow): Promise<void> {
        await this._dataSource.createRelationship(userFollow);
    }

    public async saveUserCommunity(userCommunity: UserCommunity): Promise<void> {
        await this._dataSource.createRelationship(userCommunity);
    }

    public async findUserTag(userId: string, tagId: string): Promise<boolean> {
        const data = await this._dataSource.getQueryBuilder().
            match('(user:User {id: $userId})', { userId }).
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

    public async removeUserFollow(userFollow: Required<UserFollow>): Promise<void> {
        await this._dataSource.removeRelationShip(userFollow.from, userFollow.to, userFollow.label);
    }

    public async removeCommunity(userCommunity: Required<UserCommunity>): Promise<void> {
        await this._dataSource.removeRelationShip(userCommunity.from, userCommunity.to, userCommunity.label);
    }
}

export default UserRepository;