import SocketConfigurator from "@common/socket/SocketConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import CommentValidator from "./validation/CommentValidation";
import CreateCommentController from "./controller/createCommentController/CreateCommentController";
import ListCommentController from "./controller/listCommentController/ListCommentController";

class CommentListener implements IHandleDomain {
    constructor(private readonly socket: SocketConfigurator, private readonly validator: CommentValidator) { }

    setUpHandles(): void {
        this.socket.socketConfig = [
            {
                path: 'comment/create',
                controller: CreateCommentController,
                middleware: {
                    validator: this.validator.createCommentValidate()
                }
            },
            {
                path: 'comment/',
                controller: ListCommentController,
                room: 'comment/:postId',
                middleware: {
                    validator: this.validator.listCommentValidate()
                }
            }
        ];
    }

    get handle(): SocketConfigurator {
        return this.socket
    }
}

const commentListener = new CommentListener(SocketConfigurator.getInstance(), new CommentValidator());
export default commentListener;