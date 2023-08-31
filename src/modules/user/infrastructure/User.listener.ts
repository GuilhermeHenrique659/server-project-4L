import SocketConfigurator from "@common/socket/SocketConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import UserValidation from "../validation/UserValidation";
import UserTypingController from "./controller/userTypingController/UserTypingController";

class UserListener implements IHandleDomain {
    constructor(private readonly socket: SocketConfigurator, private readonly validator: UserValidation) { }

    setUpHandles(): void {
        this.socket.socketConfig = [
            {
                path: 'user/type',
                controller: UserTypingController,
                middleware: {
                    validator: this.validator.userTypeValidate()
                }
            },
        ];
    }

    get handle(): SocketConfigurator {
        return this.socket
    }
}

const userListener = new UserListener(SocketConfigurator.getInstance(), new UserValidation());
export default userListener;