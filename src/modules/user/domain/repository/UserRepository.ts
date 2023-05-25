import IDataSource from "@common/database/repository/IDataSource";
import User from "../entity/User";
import IUserRepository from "./IUserRepository";

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
}

export default UserRepository;