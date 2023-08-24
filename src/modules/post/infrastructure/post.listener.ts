import SocketConfigurator from "@common/socket/SocketConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";

import PostValidation from "../validation/PostValidation";
import CreatePostLikedController from "./controller/CreateUserLikedController.ts/CreateUserLikedController";
import CreatePostController from "./controller/CreatePostController.ts/CreatePostController";


class PostListener implements IHandleDomain {
    constructor(private readonly socket: SocketConfigurator,
        private readonly postValidation: PostValidation) { }


    setUpHandles(): void {
        this.socket.socketConfig = [
            {
                controller: CreatePostLikedController,
                path: 'post/like',
                middleware: {
                    validator: this.postValidation.createLike(),
                }
            },
            {
                controller: CreatePostController,
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

const postListener = new PostListener(SocketConfigurator.getInstance(), new PostValidation());

export default postListener;