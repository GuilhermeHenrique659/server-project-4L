import User from "../../entity/User";

export type CreateAvatarServiceDTO = {
    userId: string;
    fileData: string;
    type: string;    
}