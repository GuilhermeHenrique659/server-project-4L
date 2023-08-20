import SocketConfigurator from "@common/socket/SocketConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import PostControllerFactory from "./controller/PostControllerFactory";
import postControllerFactory from "./controller";
import { HttpMethods } from "@common/emun/HttpMethod";
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods";
import PostValidation from "../validation/PostValidation";


class PostListener implements IHandleDomain {
        constructor (private readonly socket: SocketConfigurator,
            private readonly postControllerFactory: PostControllerFactory,
            private readonly postValidation: PostValidation) {}


    setUpHandles(): void {
        this.socket.socketConfig = [
            {
                controller: this.postControllerFactory.getCreateLikeController(),
                path: 'post/like',
                middleware: {
                    validator: this.postValidation.createLike(),
                }
            },
            {
                controller: this.postControllerFactory.getCreatePostController(),
                path: 'post/add',
                middleware: {
                    validator: this.postValidation.createPostValidate(),
                },
            }
        ]
    }

    get handle(): SocketConfigurator {
        return this.socket;
    }
}

const postListener = new PostListener(SocketConfigurator.getInstance(), postControllerFactory, new PostValidation());

export default postListener;