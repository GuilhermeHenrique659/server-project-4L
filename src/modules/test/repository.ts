import IDataSource from "@common/database/repository/IDataSource";
import Person from "./Person";


export class TestRepository {
    private _dataSource: IDataSource<Person>

    constructor (dataSource: IDataSource<Person>) {
        this._dataSource = dataSource;
    }

    public async save(person: Person) {
        return this._dataSource.store(person);
    }

    public async find(id: string) {
        return this._dataSource.findOne({
            name: id
        })
    }
}
