export type serviceOutputType<T = any> = T 

export type serviceDTOType<T = Record<string, unknown>> = T 

export default interface IService {
    execute(data: serviceDTOType): Promise<serviceOutputType>
}