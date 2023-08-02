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