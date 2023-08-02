import IEdge from "@common/database/datasource/types/IEdge";
import Community from "@modules/community/domain/entity/Community";
import File from "@modules/file/domain/entity/File";

class CommunityAvatar implements IEdge{
    public readonly label: string;

    public readonly from?: Community;

    public readonly to?: File;

    constructor(from?: Community, to?: File){
        this.label = 'AVATAR';
        this.from = from;
        this.to = to;
    }
}

export default CommunityAvatar;