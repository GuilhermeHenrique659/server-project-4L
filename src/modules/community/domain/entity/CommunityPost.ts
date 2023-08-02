import IEdge from "@common/database/datasource/types/IEdge";
import Post from "@modules/post/domain/entity/Post";
import Community from "./Community";

class CommunityPost implements IEdge {
    public readonly label: string;

    public readonly from?: Community;

    public readonly to?: Post;

    constructor(from?: Community, to?: Post){
        this.label = 'INSIDE';
        this.from = from;
        this.to = to;
    }
}

export default CommunityPost;