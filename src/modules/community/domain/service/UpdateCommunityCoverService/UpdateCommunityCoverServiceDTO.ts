import Community from "../../entity/Community";

export type UpdateCommunityCoverServiceDTO = {
    community: Community;
    fileData: string;
    type: string;
}