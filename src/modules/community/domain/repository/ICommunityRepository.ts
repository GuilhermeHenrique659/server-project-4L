import Community from "../entity/Community";
import CommunityAdmin from "../entity/CommunityAdmin";
import CommunityPost from "../entity/CommunityPost";

interface ICommunityRepository {
    findById(id: string): Promise<Community | undefined>;
    findByName(name: string): Promise<Community | undefined>;
    saveCommunityAdmin(communityAdmin: CommunityAdmin): Promise<void>;
    saveCommunityPost(communityPost: CommunityPost): Promise<void>;
    save(community: Community): Promise<Community>
}

export default ICommunityRepository;