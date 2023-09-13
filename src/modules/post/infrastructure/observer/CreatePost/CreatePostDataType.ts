import { CreatePostControllerResponse } from "../../controller/CreatePostController/CreatePostControllerResponse"

export type CreatePostDataObserverType = {
    data: CreatePostControllerResponse;
    userId: string;
    communityId: string;
}