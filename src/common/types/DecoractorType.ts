export type Type<T> = {
    new (...agrs: any[]): T;
}