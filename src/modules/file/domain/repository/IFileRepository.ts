import File from "../entity/File";

export default interface IFileRepository {
    save(file: File): Promise<File>;
}