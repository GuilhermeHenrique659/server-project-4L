import User from "@modules/user/domain/entity/User";

export type UserTypingControllerInputDTO = {
    context: {
        name: string;
        id: string;
        hasContent: boolean;
    },
    userData: Pick<User, 'id' | 'name'> & {
        avatar?: string
    };
};