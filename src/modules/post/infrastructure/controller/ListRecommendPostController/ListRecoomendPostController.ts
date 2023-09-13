import IController from "@common/controller/IController";
import AppError from "@common/errors/AppError";
import { ControllerInput } from "@common/types/ControllerIO";
import ListRecommendPostService from "@modules/post/domain/service/ListRecommendPostService/ListRecommendPostService";
import { ListRecommendPostControllerDTO } from "./ListRecommendPostControllerDTO";
import Post from "@modules/post/domain/entity/Post";
import { injectable } from "tsyringe";

@injectable()
class ListRecommendPostController implements IController {
    constructor(private readonly _listPostService: ListRecommendPostService) { }

    public async handle(payload: ControllerInput<ListRecommendPostControllerDTO>): Promise<Post[]> {
        const { user, data } = payload;
        const limit = data.limit ?? 3;
        let skip = data.page === 0 ? 0 : (data.page * limit)


        if (!user) throw new AppError("User não autenticado");


        const posts = await this._listPostService.execute({ userId: user.id, limit, skip });

        if (posts.length === 0)
            return await this._listPostService.execute({ userId: user.id, limit, skip, useAlgorithmic: false });


        return posts
    }
}

export default ListRecommendPostController;