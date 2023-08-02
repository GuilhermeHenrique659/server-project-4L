import IEntity from "./IEntity";

export default interface IEdge {
    readonly label: string;
    readonly from?: IEntity;
    readonly to?: IEntity
}