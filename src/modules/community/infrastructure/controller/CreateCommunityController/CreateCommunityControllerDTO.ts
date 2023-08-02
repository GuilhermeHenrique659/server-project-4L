import Community from "@modules/community/domain/entity/Community";
import User from "@modules/user/domain/entity/User";

export type CreateCommunityRequestDTO = {
    name: string;
    description: string;
}

export type CreateCommunityResponseDTO = {
    community: Pick<Community, 'name' | 'description'> & {
        admin: Pick<User, 'name' | 'id' | 'avatar'>;
    }
}