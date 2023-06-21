export type ControllerInput<T> = {
    data: T,
    user?: {
        id: string;
    }
};

export type ControllerOutput<T> = T;