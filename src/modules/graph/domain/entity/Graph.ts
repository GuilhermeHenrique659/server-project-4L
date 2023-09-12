import { EntityDateType } from "@common/database/datasource/types/EntityDateType";
import IEntity from "@common/database/datasource/types/IEntity";

class Graph implements IEntity {
    public readonly id: string;

    public readonly label: string;

    public name: string

    public createdAt: EntityDateType;

    constructor(props: Partial<Graph>) {
        Object.assign(props)
    }
}

export default Graph;