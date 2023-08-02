import IEdge from "@common/database/datasource/types/IEdge";
import User from "./User";
import Community from "@modules/community/domain/entity/Community";

class UserCommunity implements IEdge{
    public readonly label: string;

    public readonly from?: User;

    public readonly to?: Community;

    constructor(from?: User, to?: Community){
        this.label = 'FOLLOW';
        this.from = from;
        this.to = to;
    }
}

export default UserCommunity;