import { EntityDateType } from "@common/database/datasource/types/EntityDateType";
import IEntity from "@common/database/datasource/types/IEntity";
import InjectEntityLabel from "@common/helpers/InjectEntityLabel";
import File from "@modules/file/domain/entity/File";
import Post from "@modules/post/domain/entity/Post";
import Tag from "@modules/tag/domain/entity/Tag";
import User from "@modules/user/domain/entity/User";
import { v4 as uuidv4 } from 'uuid';


@InjectEntityLabel
class Community implements IEntity {
    public readonly id: string;

    public readonly label: string;

    public name: string

    public description: string;

    public admin: User;

    public avatar?: File;

    public cover?: File;

    public posts?: Post[];

    public users?: User[];

    public tags?: Tag[];

    public hasFollowing?: boolean;

    public createdAt: EntityDateType;

    public updatedAt?: EntityDateType;

    constructor(props: Partial<Community>) {
        Object.assign(this, props)

        if (!props.id) {
            this.id = uuidv4()
        }
    }
}

export default Community;