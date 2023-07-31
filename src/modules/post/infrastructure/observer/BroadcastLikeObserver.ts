import IObserver from "@common/observer/IObserver";
import SocketConfigurator from "@common/socket/SocketConfigurator";

export default class BroadcastLikeObserver implements IObserver {
    public async update<LikeDataType>(data?: LikeDataType): Promise<void> {
        SocketConfigurator.getInstance().emit('post/like-add', data);
    }
}