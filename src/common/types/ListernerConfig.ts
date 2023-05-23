import IController from "@common/controller/IController"

export type ListenerConfig = { 
    path: string;
    controller: IController;
    isAuthenticate?: boolean;
    room?: string;
}