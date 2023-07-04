import IEdge from "@common/database/datasource/types/IEdge";
import User from "./User";
import File from "@modules/file/domain/entity/File";


class UserAvatar implements IEdge {
    public readonly label: string;
    
    public readonly from: User;

    public readonly to: File 

    constructor (from: User, to: File){
        this.label = 'AVATAR';
        this.from = from;
        this.to = to;
    }
}

export default UserAvatar;