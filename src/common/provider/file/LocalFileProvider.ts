import uploadConfig from "@config/upload/uploadConfig";
import IFileProvider, { fileData } from "./IFileProvider";
import fs from 'fs'
import path from 'path'

class LocalFileProvider implements IFileProvider {
    private _bucket: string[];

    constructor() {
        this._bucket = [];
    }

    public async save(files: fileData[]): Promise<string[]> {
        const filenames: string[] = [];
        for (const file of files) {
            const filename = uploadConfig.storage.filename()
            await fs.promises.writeFile(`${uploadConfig.directory}/${filename}.${file.type}`, file.data, 'base64');
            filenames.push(filename + `.${file.type}`);
        }
        this._bucket.push(...filenames);
        return filenames;
    }

    public async remove(filename: string): Promise<void> {
        const filePath = path.join(uploadConfig.directory, filename);
        const fileExits = await fs.promises.stat(filePath);
        if (fileExits) {
            await fs.promises.unlink(filePath);
        }
    }

    public async rollback(): Promise<void> {
        if (this._bucket.length === 0) return;
        for (const filename of this._bucket) {
            const filePath = path.join(uploadConfig.directory, filename);
            await fs.promises.unlink(filePath);
        }
    }
}

export default LocalFileProvider;