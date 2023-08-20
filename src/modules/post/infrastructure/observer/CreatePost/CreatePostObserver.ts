import IObserver from "@common/observer/IObserver";
import SocketConfigurator from "@common/socket/SocketConfigurator";
import { CreatePostDataObserverType } from "./CreatePostDataType";

class CreatePostNotifyCommunityObserver implements IObserver {
    public async update({ data, userId, communityId}: CreatePostDataObserverType): Promise<void> {        
        SocketConfigurator.getInstance().emit('post/added', { data }, { room: `community/${communityId}`});
    }
}

export const createPostNotifyCommunityObserver = new CreatePostNotifyCommunityObserver();