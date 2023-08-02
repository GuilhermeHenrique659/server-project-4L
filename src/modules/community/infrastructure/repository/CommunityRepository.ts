import IDataSource from "@common/database/datasource/IDataSource";
import Community from "@modules/community/domain/entity/Community";
import CommunityAdmin from "@modules/community/domain/entity/CommunityAdmin";
import CommunityPost from "@modules/community/domain/entity/CommunityPost";
import ICommunityRepository from "@modules/community/domain/repository/ICommunityRepository";

class CommunityRepository implements ICommunityRepository{
    constructor(private readonly _dataSource: IDataSource<Community>){}

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

    public async getCommunityData(id: string): Promise<Community | undefined> {
        return await this._dataSource.getQueryBuilder().
            match('(community: Community { id: $id})', { id }).
            match('(community)').goOut('u:ADMIN', 'admin:User').
            optional().match('(admin)').goOut('au:AVATAR', 'avatarUser:File').
            optional().match('(community)').goOut('a:AVATAR', 'avatar:File').
            optional().match('(community)').goOut('c:COVER', 'cover:File').
            optional().match('(community)').goOut('t:TAGGED', 'comTags:Tag').
            with('community, admin{ name: admin.name, id: admin.id, avatar: avatarUser{.*} } as admin, cover, avatar, collect(DISTINCT comTags{.*}) as tags').     
            return('community{.*, avatar, cover, admin, tags}').
            getOne<Community>('executeRead');
    }

    public async save(community: Community): Promise<Community> {
        return await this._dataSource.store(community);
    }

    public async saveCommunityAdmin(communityAdmin: CommunityAdmin): Promise<void> {
        await this._dataSource.createRelationship(communityAdmin);
    }

    public async saveCommunityPost(communityPost: CommunityPost): Promise<void> {
        await this._dataSource.createRelationship(communityPost);
    }
}

export default CommunityRepository;