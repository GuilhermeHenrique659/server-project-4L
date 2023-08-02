import IEdge from "@common/database/datasource/types/IEdge";
import Community from "./Community";
import Tag from "@modules/tag/domain/entity/Tag";

class CommunityTag implements IEdge {
    public readonly label: string;

    public readonly from?: Community;

    public readonly to?: Tag;

    constructor(from?: Community, to?: Tag){
        this.label = 'TAGGED',
        this.from = from;
        this.to = to;
    }
}

export default CommunityTag;