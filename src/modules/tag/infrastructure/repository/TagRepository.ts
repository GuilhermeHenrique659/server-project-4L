import IDataSource from "@common/database/datasource/IDataSource";
import Tag from "@modules/tag/domain/entity/Tag";
import ITagRepository from "@modules/tag/domain/repository/ITagRepository";

class TagRepository implements ITagRepository {
    constructor (private readonly _dataSource: IDataSource<Tag>) {}

    public async store(tag: Tag): Promise<Tag> {
        return this._dataSource.store(tag);
    }

    public async findByDescription(description: string): Promise<Tag | undefined> {
        return await this._dataSource.findOne({
            description: description,
        });
    }

    public async findById(id: string): Promise<Tag | undefined> {
        return await this._dataSource.findOne({
            id: id,
        });
    }

    public async search(searchTerm: string): Promise<Tag[]> {
        return this._dataSource.getQueryBuilder().
            match('(t:Tag)').
            where(`toLower(t.description) =~ '.*${searchTerm}.*'`).
            return('t{.*}').
            getMany<Tag>('executeRead')
    }
}

export default TagRepository;