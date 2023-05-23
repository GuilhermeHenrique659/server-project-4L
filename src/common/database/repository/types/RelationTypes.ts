import IEntity from "./IEntity";

type relationAttribute<T> = {
    [K in keyof T]: T[K] extends IEntity ? K : never;
}[keyof T];


export type relationType<T extends IEntity> = {
    nodeLabel: relationAttribute<T>
    relationLabel?: string;
    direction?: 'out' | 'in'
}