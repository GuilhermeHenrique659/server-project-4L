import IEntity from "@common/database/datasource/types/IEntity";
import InjectEntityLabel from "@common/helpers/InjectEntityLabel";
import User from "@modules/user/domain/entity/User";
import { v4 as uuidv4 } from 'uuid';

@InjectEntityLabel
class Post implements IEntity {
    public readonly id: string;

    public readonly label: string;

    public content: string;

    public user: User;

    public createdAt: string;

    public updatedAt?: string;


    constructor (props: Partial<Post>) {
        Object.assign(this, props);

        if (props.id) {
            this.id = uuidv4()
        }
    }
}

export default Post