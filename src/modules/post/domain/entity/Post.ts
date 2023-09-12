import { EntityDateType } from "@common/database/datasource/types/EntityDateType";
import IEntity from "@common/database/datasource/types/IEntity";
import InjectEntityLabel from "@common/helpers/InjectEntityLabel";
import Community from "@modules/community/domain/entity/Community";
import File from "@modules/file/domain/entity/File";
import Tag from "@modules/tag/domain/entity/Tag";
import User from "@modules/user/domain/entity/User";
import { v4 as uuidv4 } from 'uuid';

@InjectEntityLabel
class Post implements IEntity {
    public readonly id: string;

    public readonly label: string;

    public content: string;

    public user: User;

    public tags: Tag[];

    public files: File[];

    public community?: Community;

    public hasLike: boolean;

    public likeCount: number;

    public createdAt: EntityDateType;

    public updatedAt?: EntityDateType;


    constructor(props: Partial<Post>) {
        Object.assign(this, props);

        if (!props.id) {
            this.id = uuidv4()
        }
    }
}

export default Post