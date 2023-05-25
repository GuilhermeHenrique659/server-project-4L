import IEntity from "@common/database/repository/types/IEntity";

function InjectEntityLabel(target: new ({}) => IEntity) {
    target.prototype.label = target.name;
}

export default InjectEntityLabel