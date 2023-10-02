import IEntity from "@common/database/datasource/types/IEntity";

function InjectEntityLabel(target: new (...agrs: any[]) => IEntity) {
    target.prototype.label = target.name;
}

export default InjectEntityLabel