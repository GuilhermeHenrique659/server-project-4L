import IEdge from "@common/database/datasource/types/IEdge";
import IEntity from "@common/database/datasource/types/IEntity";
import User from "./User";
import Tag from "@modules/tag/domain/entity/Tag";

class UserTags implements IEdge {
    public readonly label: string;

    public readonly from: User;

    public readonly to: Tag;
    
    constructor (from: User, to: Tag) {
        this.label = 'INTEREST'
        this.from = from
        this.to = to
    }
}

export default UserTags;