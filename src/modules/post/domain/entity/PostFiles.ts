import IEdge from "@common/database/datasource/types/IEdge";
import Post from "./Post";
import File from "@modules/file/domain/entity/File";

class PostFiles implements IEdge {
    public readonly label: string;

    public readonly from?: Post;

    public readonly to?: File;

    constructor (from?: Post, to?: File){
        this.label = 'HAS';
        this.from = from;
        this.to = to;
    }
}

export default PostFiles;