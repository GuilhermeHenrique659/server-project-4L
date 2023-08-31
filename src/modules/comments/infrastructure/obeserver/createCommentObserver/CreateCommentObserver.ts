import IObserver from "@common/observer/IObserver";
import SocketConfigurator from "@common/socket/SocketConfigurator";
import { singleton } from "tsyringe";
import { CreateCommentDTO } from "./CreateCommentDTO";

@singleton()
class CreateCommentObserver implements IObserver {
    public async update({ comment, postId }: CreateCommentDTO): Promise<void> {
        SocketConfigurator.getInstance().emit('comment/added', { data: comment }, { room: `comment/${postId}` });
    }
}

export default CreateCommentObserver;