import IEntity from "@common/database/datasource/types/IEntity";
import InjectEntityLabel from "@common/helpers/InjectEntityLabel";
import Community from "@modules/community/domain/entity/Community";
import File from "@modules/file/domain/entity/File";
import Post from "@modules/post/domain/entity/Post";
import Tag from "@modules/tag/domain/entity/Tag";
import { v4 as uuidv4 } from 'uuid';

@InjectEntityLabel
class User implements IEntity {
    public readonly id: string;

    public readonly label: string;

    public name: string;

    public email: string;

    public password: string;

    public avatar?: File;

    public tags?: Tag[];

    public posts?: Post[];

    public communities?: Community[];

    public isOnline?: boolean;

    public createdAt: string;

    public updatedAt?: string;

    constructor (props: Partial<User>) {
        Object.assign(this, props);
        
        if (!props.id) {
            this.id = uuidv4()
        }
    }
}

export default User;