import IDataSource from "@common/database/datasource/IDataSource";
import IEdge from "@common/database/datasource/types/IEdge";
import Graph from "@modules/graph/domain/entity/Graph";
import { IGraphRepository } from "@modules/graph/domain/repository/IGraphRepository";
import Post from "@modules/post/domain/entity/Post";
import Tag from "@modules/tag/domain/entity/Tag";
import User from "@modules/user/domain/entity/User";

class GraphRepository implements IGraphRepository {
    constructor (private readonly _dataSource: IDataSource<Graph>) {}

    public async generateNewGraph(graphname: string, relations: IEdge[]): Promise<Graph> {
        const graph = new Graph({ name: graphname});
        await this._dataSource.getQueryBuilder().query(
            `CALL gds.graph.project(
                $graphname,
                {
                  ${User.name}: {},
                  ${Tag.name}: {},
                  ${Post.name}: {}
                },
                [${relations.map(relation => `'${relation.label}'`)}]
              )`, { graphname }
        ).setData('executeWrite');

        return graph
    }

    public async dropGraph(graphname: string): Promise<void> {
        await this._dataSource.getQueryBuilder().query(
            `CALL gds.graph.drop("${graphname}")
            YIELD graphName`
        ).setData('executeWrite');
    }
}

export default GraphRepository;