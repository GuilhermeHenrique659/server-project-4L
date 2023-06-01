export type serviceOutputType<T = any | void> = T 

export type serviceDTOType<T = Record<string, unknown>> = T 

export default interface IService {
    execute(data: serviceDTOType): Promise<serviceOutputType>
}