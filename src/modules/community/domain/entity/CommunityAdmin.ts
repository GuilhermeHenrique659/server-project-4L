import IEdge from "@common/database/datasource/types/IEdge";
import Community from "./Community";
import User from "@modules/user/domain/entity/User";

class CommunityAdmin implements IEdge {
    public readonly label: string;

    public readonly from?: Community;

    public readonly to?: User;

    constructor(from?: Community, to?: User) {
        this.label = 'ADMIN';
        this.from = from;
        this.to = to;
    }
}

export default CommunityAdmin;