import IEntity from "./IEntity";


export type relationType<T extends IEntity> = {
    nodeLabel: string
    relationLabel?: string;
    direction?: 'out' | 'in'
}