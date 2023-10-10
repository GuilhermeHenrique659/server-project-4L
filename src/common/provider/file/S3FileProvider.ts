import IFileProvider, { fileData } from "./IFileProvider";
import { DeleteObjectCommand, S3 } from '@aws-sdk/client-s3'
import uploadConfig from "@config/upload/s3config";

class S3FileProvider implements IFileProvider {
    private _bucket: string[];
    private _s3: S3

    constructor() {

        this._s3 = new S3(uploadConfig.options);
        this._bucket = [];
    }

    public async save(files: fileData[]): Promise<string[]> {
        const filenames: string[] = [];
        for (const file of files) {
            const filename = uploadConfig.storage.filename() + `.${file.type}`;
            const buffer = Buffer.from(file.data, 'base64');

            await this._s3.putObject({
                Bucket: uploadConfig.bucket,
                Key: filename,
                Body: buffer,
                ContentEncoding: 'base64',
                ContentType: `image/${file.type}`
            });

            filenames.push(filename);
        }
        this._bucket.push(...filenames);
        return filenames;
    }

    public async remove(filename: string): Promise<void> {
        this._s3.deleteObject({
            Bucket: uploadConfig.bucket,
            Key: filename
        })

    }

    public async rollback(): Promise<void> {
        if (this._bucket.length === 0) return;
        this._bucket.map(async (filename) => await this.remove(filename))
    }
}

export default S3FileProvider;