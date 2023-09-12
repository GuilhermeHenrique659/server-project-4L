import { EntityDateType } from "@common/database/datasource/types/EntityDateType";
import IEntity from "@common/database/datasource/types/IEntity";
import InjectEntityLabel from "@common/helpers/InjectEntityLabel";
import User from "@modules/user/domain/entity/User";
import { v4 as uuidv4 } from 'uuid';

@InjectEntityLabel
class Comment implements IEntity {
    public readonly id: string;

    public readonly label: string;

    public content: string;

    public user: User;

    public createdAt: EntityDateType;

    public updatedAt?: EntityDateType;

    constructor(props: Partial<Comment>) {
        Object.assign(this, props);

        if (!props.id) {
            this.id = uuidv4();
        }
    }
}

export default Comment;