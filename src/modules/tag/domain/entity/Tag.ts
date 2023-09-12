import { EntityDateType } from "@common/database/datasource/types/EntityDateType";
import IEntity from "@common/database/datasource/types/IEntity";
import InjectEntityLabel from "@common/helpers/InjectEntityLabel";
import { v4 as uuidv4 } from 'uuid';

@InjectEntityLabel
class Tag implements IEntity {
    public readonly id: string;

    public readonly label: string;

    public description: string;

    public createdAt: EntityDateType;

    public updatedAt?: EntityDateType;

    constructor(props: Partial<Tag>) {
        Object.assign(this, props);

        if (!props.id) {
            this.id = uuidv4()
        }
    }
}

export default Tag;