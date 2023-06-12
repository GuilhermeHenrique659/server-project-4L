export type file = {
    type: string;
    data: string
}


export default interface IFileProvider {
    save(files: file[]): Promise<string[]>;
    remove(filename: string): Promise<void> 
}