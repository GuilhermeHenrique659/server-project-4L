import IEdge from "@common/database/datasource/types/IEdge";
import User from "./User";

class UserFollow implements IEdge {
    public readonly label: string;

    public readonly from?: User;

    public readonly to?: User;

    constructor(from?: User, to?: User) {
        this.label = 'FOLLOW';

        this.from = from;
        this.to = to;
    }

    public isAllowed(from: User, to: User): boolean {
        if (from.id === to.id) {
            return false;
        }

        return true;
    }
}

export default UserFollow;