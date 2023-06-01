import IEntity from "@common/database/datasource/types/IEntity";
import InjectEntityLabel from "@common/helpers/InjectEntityLabel";
import { v4 as uuidv4 } from 'uuid';

@InjectEntityLabel
class Tag implements IEntity {
    public readonly id: string;

    public readonly label: string;

    public description: string;

    constructor (props: Omit<Tag, 'id' | 'label' | keyof Tag>, id?: string) {
        Object.assign(this, props);
        
        if (!id) {
            this.id = uuidv4()
        }
    }
}

export default Tag;