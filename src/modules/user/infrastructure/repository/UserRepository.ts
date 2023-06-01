import IDataSource from "@common/database/datasource/IDataSource";
import User from "../../domain/entity/User";
import IUserRepository from "../../domain/repository/IUserRepository";
import Tag from "@modules/tag/domain/entity/Tag";

class UserRepository implements IUserRepository {
    private readonly _dataSource: IDataSource<User>;

    constructor (dataSource: IDataSource<User>) {
        this._dataSource = dataSource;
    }

    public async save(user: User) {
        return await this._dataSource.store(user);
    }

    public async findByEmail(email: string) {
        return await this._dataSource.findOne({
            email: email
        });
    }

    public async saveTag(user: User, tag: Tag): Promise<void> {        
        await this._dataSource.createRelationship(user, 'INTEREST', tag);
    }
}

export default UserRepository;