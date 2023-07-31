import IObserver from "@common/observer/IObserver";
import SocketConfigurator from "@common/socket/SocketConfigurator";
import { LikeDataType } from '@modules/post/infrastructure/observer/LikeDataType'

class BroadcastLikeObserver implements IObserver {
    public async update(data: LikeDataType): Promise<void> {        
        SocketConfigurator.getInstance().emit('post/like-added', data, undefined, data.userId);
    }
}

export const broadcastLikeObserver = new BroadcastLikeObserver();