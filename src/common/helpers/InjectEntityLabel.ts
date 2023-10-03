import IEntity from "@common/database/datasource/types/IEntity";

function InjectEntityLabel(target: new (...agrs: any[]) => IEntity) {
    Reflect.defineMetadata('label', target.name, target);
    target.prototype.label = target.name;
}

export default InjectEntityLabel