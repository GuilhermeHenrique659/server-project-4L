import { CreatePostControllerResponse } from "../../controller/CreatePostController.ts/CreatePostControllerResponse"

export type CreatePostDataObserverType = {
    data: CreatePostControllerResponse;
    userId: string;
    communityId: string;
}