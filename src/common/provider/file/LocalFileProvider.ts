import uploadConfig from "@config/upload/uploadConfig";
import IFileProvider, { file } from "./IFileProvider";
import fs from 'fs'
import path from 'path'

class LocalFileProvider implements IFileProvider {
    public async save(files: file[]): Promise<string[]> {
        const filenames: string[] = [];
        for (const file of files) {
            const filename = uploadConfig.storage.filename()
            await fs.promises.writeFile(`${uploadConfig.directory}/${filename}.${file.type}`, file.data);
            filenames.push(filename + `.${file.type}`);
        }
        return filenames;
    }

    public async remove(filename: string): Promise<void> {
        const filePath = path.join(uploadConfig.directory, filename);
        const fileExits = await fs.promises.stat(filePath);
        if (fileExits) {
            await fs.promises.unlink(filePath);
        }
    }
}

export default LocalFileProvider;