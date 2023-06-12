export type ControllerInput<T> = T & {
    user?: {
        id: string;
    }
};

export type ControllerOutput<T> = T;