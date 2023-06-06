export type ControllerInput<T = any> = T & {
    user?: {
        id: string;
    }
};

export type ControllerOutput<T = any> = T;