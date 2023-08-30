import IEdge from "@common/database/datasource/types/IEdge";
import Comment from "./Comment";
import User from "@modules/user/domain/entity/User";

class CommentUser implements IEdge {
    public readonly label: string;

    public from?: Comment;

    public to?: User;

    constructor(from?: Comment, to?: User) {
        this.label = 'WRITED_BY';
        this.from = from;
        this.to = to;
    }
}

export default CommentUser;