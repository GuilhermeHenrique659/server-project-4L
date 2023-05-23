import IEntity from "@common/database/repository/types/IEntity";

const GetEntityMetadata = (entity: new ({}) => IEntity) => {
    return (new entity({})).constructor.name
}

export default GetEntityMetadata