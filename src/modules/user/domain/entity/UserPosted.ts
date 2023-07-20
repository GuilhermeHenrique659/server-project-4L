import IEdge from "@common/database/datasource/types/IEdge";
import Post from "@modules/post/domain/entity/Post";
import User from "./User";


class UserPosted implements IEdge {
    public readonly label: string;
    
    public readonly from: User;

    public readonly to: Post 

    constructor (from: User, to: Post){
        this.label = 'POSTED';
        this.from = from;
        this.to = to;
    }
}

export default UserPosted;