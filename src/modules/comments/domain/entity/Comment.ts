import IEntity from "@common/database/datasource/types/IEntity";
import InjectEntityLabel from "@common/helpers/InjectEntityLabel";
import { v4 as uuidv4 } from 'uuid';

@InjectEntityLabel
class Comment implements IEntity {
    public readonly id: string;

    public readonly label: string;

    public content: string;

    public createdAt: string;

    public updatedAt?: string;

    constructor(props: Partial<Comment>) {
        Object.assign(this, props);

        if (!props.id) {
            this.id = uuidv4();
        }
    }
}

export default Comment;