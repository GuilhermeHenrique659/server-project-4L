import { EntityDateType } from "./EntityDateType";

export default interface IEntity {
    id: string;
    label: string;
    createdAt: EntityDateType;
    updatedAt?: EntityDateType;
}