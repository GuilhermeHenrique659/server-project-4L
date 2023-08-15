import IDataSource from "@common/database/datasource/IDataSource";
import File from "@modules/file/domain/entity/File";
import IFileRepository from "@modules/file/domain/repository/IFileRepository";

export default class FileRepository implements IFileRepository {
    constructor (private readonly _dataSource: IDataSource<File>) {}

    public async save(file: File): Promise<File> {
        return await this._dataSource.store(file);
    }

    public async remove(id: string): Promise<void> {
        await this._dataSource.remove(id);
    }
}