import IController from "@common/controller/IController";
import AppError from "@common/errors/AppError";
import { ControllerInput } from "@common/types/ControllerIO";
import GraphServiceFactory from "@modules/graph/domain/service/GraphServiceFactory";
import PostServiceFactory from "@modules/post/domain/service/PostServiceFactory";
import { ListRecommendPostControllerDTO } from "./ListRecommendPostControllerDTO";
import Post from "@modules/post/domain/entity/Post";

class ListRecommendPostController implements IController {
    constructor (private graphServices: GraphServiceFactory, 
        private postServices: PostServiceFactory){}

    public async handle(payload: ControllerInput<ListRecommendPostControllerDTO>): Promise<Post[]> {
        const { user, data } = payload;
        const limit = data.limit ?? 3;
        const skip = data.page === 0 ? 0 : (data.page * limit)


        if (!user) throw new AppError("User não autenticado");

        //await this.graphServices.getGenerateGraph().execute({ name: `socialGraph-${user.id}` });

        const posts = await this.postServices.getListPost().execute({ userId: user.id, limit, skip });

        if (posts.length === 0) return await this.postServices.getListPost().execute({ userId: user.id, limit, skip, useAlgorithmic: false });

        return posts
    }
}

export default ListRecommendPostController;