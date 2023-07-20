import IEdge from "@common/database/datasource/types/IEdge";
import User from "./User";
import Post from "@modules/post/domain/entity/Post";

class UserLiked implements IEdge {
    public readonly label: string;

    public readonly to: Post;

    public readonly from: User;

    constructor (from: User, to: Post){
        this.label = 'LIKED';
        this.from = from;
        this.to = to;
    }
}

export default UserLiked