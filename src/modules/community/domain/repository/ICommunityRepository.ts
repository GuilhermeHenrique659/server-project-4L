import File from "@modules/file/domain/entity/File";
import Community from "../entity/Community";
import CommunityAdmin from "../entity/CommunityAdmin";
import CommunityPost from "../entity/CommunityPost";
import CommunityAvatar from "../entity/CommunityAvatar";
import CommunityCover from "../entity/CommunityCover";
import CommunityTag from "../entity/CommunityTag";
import Tag from "@modules/tag/domain/entity/Tag";

interface ICommunityRepository {
    findById(id: string): Promise<Community | undefined>;
    findByName(name: string): Promise<Community | undefined>;
    findCommunityUsers(id: string): Promise<{id: string}[]>;
    findCoverById(id: string): Promise<File | undefined>;
    findAvatarById(id: string): Promise<File | undefined>;
    findCommunityTags(id: string): Promise<Tag[]>;
    saveCommunityAvatar(communityAvatar: CommunityAvatar): Promise<void>;
    saveCommunityCover(communityCover: CommunityCover): Promise<void>;
    saveCommunityAdmin(communityAdmin: CommunityAdmin): Promise<void>;
    saveCommunityPost(communityPost: CommunityPost): Promise<void>;
    saveCommunityTag(communityTag: CommunityTag): Promise<void>;
    save(community: Community): Promise<Community>;
    getCommunityData(id: string): Promise<Community | undefined>;
    removeCommunityTag(communityTag: CommunityTag): Promise<void>
}

export default ICommunityRepository;