import IController from "@common/controller/IController";
import AppError from "@common/errors/AppError";
import { ControllerInput } from "@common/types/ControllerIO";
import GraphServiceFactory from "@modules/graph/domain/service/GraphServiceFactory";
import PostServiceFactory from "@modules/post/domain/service/PostServiceFactory";

class ListRecommendPostController implements IController {
    constructor (private graphServices: GraphServiceFactory, 
        private postServices: PostServiceFactory){}

    public async handle(payload: ControllerInput<void>): Promise<any> {
        const { user } = payload;

        if (!user) throw new AppError("User não autenticado");

        await this.graphServices.getGenerateGraph().execute({ name: user.id });

        return await this.postServices.getListPost().execute({ userId: user.id });
    }
}

export default ListRecommendPostController;