import IEntity from "@common/database/datasource/types/IEntity";
import InjectEntityLabel from "@common/helpers/InjectEntityLabel";
import { v4 as uuidv4 } from 'uuid';

@InjectEntityLabel
class File implements IEntity {
    public readonly id: string;

    public readonly label: string;

    public filename: string;

    public type: string;

    constructor (props: Partial<File>){
        Object.assign(this, props);
        
        if (!props.id) {
            this.id = uuidv4()
        }
    }
}

export default File