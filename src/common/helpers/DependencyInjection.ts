import { Type } from '@common/types/DecoractorType'
import 'reflect-metadata'

const InjectableClass = () => {
    return (target: Type<any>) => {
        Reflect.defineMetadata('custom:annotation', { } , target, 'inject');
    }
}

export default InjectableClass;