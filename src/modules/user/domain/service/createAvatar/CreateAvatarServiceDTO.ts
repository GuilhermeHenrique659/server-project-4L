import User from "../../entity/User";

export type CreateAvatarServiceDTO = {
    user: User;
    fileData: string;
    type: string;    
}