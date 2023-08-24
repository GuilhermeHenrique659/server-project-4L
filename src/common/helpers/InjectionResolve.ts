import DataSource from "@common/database/datasource/DataSource";
import { Type } from "@common/types/DecoractorType";
import GetDatasource from "./GetDataSource";
import User from "@modules/user/domain/entity/User";

class InjectionResolve {

    static resolve<T>(target: Type<any>): T{

        console.log(Reflect.getPrototypeOf((target)));
        
        if (Reflect.getPrototypeOf((target)) === DataSource){
            console.log(target);
            
            return new target(GetDatasource(User))
        }
        const tokens = (Reflect.getMetadata('design:paramtypes', target) as any[]) ?? [];
        console.log(tokens);
        
        const injection = tokens.map((token) => this.resolve<any>(token))

        const newInstance = new target(...injection);
        console.log(newInstance);

        return newInstance;
    }
}

export default InjectionResolve;