import IEntity from "@common/database/repository/types/IEntity";

export default class Person implements IEntity {
    public readonly id: string;

    public label: string;

    public name: string;

    constructor (props: Omit<Person, 'label'>) {
        Object.assign(this, props);
        this.label = 'Person';
    }

}