import IDataSource from "@common/database/datasource/IDataSource";
import Community from "@modules/community/domain/entity/Community";
import CommunityAdmin from "@modules/community/domain/entity/CommunityAdmin";
import CommunityAvatar from "@modules/community/domain/entity/CommunityAvatar";
import CommunityCover from "@modules/community/domain/entity/CommunityCover";
import CommunityPost from "@modules/community/domain/entity/CommunityPost";
import CommunityTag from "@modules/community/domain/entity/CommunityTag";
import ICommunityRepository from "@modules/community/domain/repository/ICommunityRepository";
import File from "@modules/file/domain/entity/File";
import Tag from "@modules/tag/domain/entity/Tag";

class CommunityRepository implements ICommunityRepository {
    constructor(private readonly _dataSource: IDataSource<Community>) { }

    public async findById(id: string): Promise<Community | undefined> {
        return await this._dataSource.findOne({
            id,
        });
    }

    public async findByName(name: string): Promise<Community | undefined> {
        return await this._dataSource.findOne({
            name,
        });
    }

    public async findCommunityUsers(id: string): Promise<string[]> {
        return await this._dataSource.getQueryBuilder().
            match('(community: Community { id: $id})', { id }).
            goIn('f:FOLLOW', 'user:User').
            return('user.id').
            getMany();
    }

    public async findAvatarById(id: string): Promise<File | undefined> {
        return await this._dataSource.getQueryBuilder().
            match('(community: Community { id: $id})', { id }).
            optional().match('(community)').goOut('a:AVATAR', 'file:File').
            return('file{.*}').
            getOne<File>('executeRead');
    }

    public async findCoverById(id: string): Promise<File | undefined> {
        return await this._dataSource.getQueryBuilder().
            match('(community: Community { id: $id})', { id }).
            optional().match('(community)').goOut('c:COVER', 'file:File').
            return('file{.*}').
            getOne<File>('executeRead');
    }

    public async getCommunityData(id: string, userId: string): Promise<Community | undefined> {        
        return await this._dataSource.getQueryBuilder().
            match('(community: Community { id: $id})', { id }).
            match('(community)').goOut('u:ADMIN', 'admin:User').
            optional().match('(admin)').goOut('au:AVATAR', 'avatarUser:File').
            optional().match('(community)').goOut('a:AVATAR', 'avatar:File').
            optional().match('(community)').goOut('c:COVER', 'cover:File').
            optional().match('(community)').goOut('t:TAGGED', 'comTags:Tag').
            optional().match('(community)').goIn('f:FOLLOW', 'uf:User {id: $userId}', { userId: userId }).
            with('community, admin{ name: admin.name, id: admin.id, avatar: avatarUser{.*} } as admin, cover{.*} as cover, avatar{.*} as avatar, collect(DISTINCT comTags{.*}) as tags, count(DISTINCT f) > 0 as hasFollowing').
            return('community{.*, avatar, cover, admin, tags, hasFollowing}').
            getOne('executeRead');
    }

    public async getFollowingCommunity(userId: string): Promise<Community[]> {
        return await this._dataSource.getQueryBuilder().
            match('(user: User {id: $userId})', { userId }).
            goOut('f:FOLLOW', 'community: Community').
            optional().match('(community)').goOut('a:AVATAR', 'avatar:File').
            with('community, avatar{.*} as avatar').
            return('community{.*, avatar }').
            getMany('executeRead')
    }

    public async save(community: Community): Promise<Community> {
        return await this._dataSource.store(community);
    }

    public async findCommunityTags(id: string): Promise<Tag[]> {
        return await this._dataSource.getQueryBuilder().
            optional().match('(community:Community {id: $id})', { id }).
            goOut('r:TAGGED', `tag:Tag`).
            with('collect(DISTINCT tag{.*}) as tags UNWIND tags as tag').
            return('tag{.*}').
            getMany('executeRead');
    }

    public async saveCommunityAvatar(communityAvatar: CommunityAvatar): Promise<void> {
        await this._dataSource.createRelationship(communityAvatar);
    }

    public async saveCommunityCover(communityCover: CommunityCover): Promise<void> {
        await this._dataSource.createRelationship(communityCover);
    }

    public async saveCommunityTag(communityTag: CommunityTag): Promise<void> {
        await this._dataSource.createRelationship(communityTag);
    }

    public async saveCommunityAdmin(communityAdmin: CommunityAdmin): Promise<void> {
        await this._dataSource.createRelationship(communityAdmin);
    }

    public async saveCommunityPost(communityPost: CommunityPost): Promise<void> {
        await this._dataSource.createRelationship(communityPost);
    }

    public async removeCommunityTag(communityTag: Required<CommunityTag>): Promise<void> {
        await this._dataSource.removeRelationShip(communityTag.from, communityTag.to, communityTag.label);
    }
}

export default CommunityRepository;