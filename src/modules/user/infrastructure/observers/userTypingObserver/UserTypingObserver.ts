import IObserver from "@common/observer/IObserver";
import { singleton } from "tsyringe";
import { UserTypingControllerInputDTO } from "../../controller/userTypingController/UserTypingControllerDTO";
import SocketConfigurator from "@common/socket/SocketConfigurator";

@singleton()
class UserTypingObserver implements IObserver {
    public async update({ context, userData }: UserTypingControllerInputDTO): Promise<void> {
        if (context.hasContent)
            await SocketConfigurator.getInstance().emit('user/typing', { data: userData }, { room: `${context.name}/${context.id}` }, userData.id);
        else
            await SocketConfigurator.getInstance().emit('user/stop-typing', { data: userData }, { room: `${context.name}/${context.id}` }, userData.id);
    }
}

export default UserTypingObserver;