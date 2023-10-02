import IObserver from "@common/observer/IObserver";
import SocketConfigurator from "@common/socket/SocketConfigurator";
import { CreatePostDataObserverType } from "./CreatePostDataType";
import { injectable, singleton } from "tsyringe";

@injectable()
class CreatePostNotifyCommunityObserver implements IObserver {
    public async update({ data, userId, communityId }: CreatePostDataObserverType): Promise<void> {
        SocketConfigurator.getInstance().emit('post/added', { data }, { room: `community/${communityId}` });
    }
}

export default CreatePostNotifyCommunityObserver