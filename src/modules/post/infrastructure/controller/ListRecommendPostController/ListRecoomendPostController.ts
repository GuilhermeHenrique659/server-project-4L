import IController from "@common/controller/IController";
import AppError from "@common/errors/AppError";
import { ControllerInput } from "@common/types/ControllerIO";
import GraphServiceFactory from "@modules/graph/domain/service/GraphServiceFactory";
import PostServiceFactory from "@modules/post/domain/service/PostServiceFactory";
import { ListRecommendPostControllerDTO } from "./ListRecommendPostControllerDTO";

class ListRecommendPostController implements IController {
    constructor (private graphServices: GraphServiceFactory, 
        private postServices: PostServiceFactory){}

    public async handle(payload: ControllerInput<ListRecommendPostControllerDTO>): Promise<any> {
        const { user, data } = payload;
        const limit = data.limit ?? 3;
        const skip = data.page === 0 ? 0 : (data.page * limit)


        if (!user) throw new AppError("User não autenticado");

        //await this.graphServices.getGenerateGraph().execute({ name: user.id });

        return await this.postServices.getListPost().execute({ userId: user.id, limit, skip });
    }
}

export default ListRecommendPostController;