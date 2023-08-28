export type fileData = {
    type: string;
    data: string
}


export default interface IFileProvider {
    save(files: fileData[]): Promise<string[]>;
    remove(filename: string): Promise<void>;
    rollback(): Promise<void>;
}