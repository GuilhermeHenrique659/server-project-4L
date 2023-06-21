import IDataSource from "@common/database/datasource/IDataSource";
import Graph from "@modules/graph/domain/entity/Graph";
import { IGraphRepository } from "@modules/graph/domain/repository/IGraphRepository";

class GraphRepository implements IGraphRepository {
    constructor (private readonly _dataSource: IDataSource<Graph>) {}

    public async generateNewGraph(): Promise<Graph> {
        const graph = new Graph('Network');
        await this._dataSource.getQueryBuilder().query(
            `CALL gds.graph.project(
                ${graph.name},
                {
                  User: {},
                  Tag:{},
                  Post: {}
                },
                ['INTEREST', 'HAS']
              )`
        ).setData('executeWrite');

        return graph
    }

    public async dropGraph(graphname: string): Promise<void> {
        await this._dataSource.getQueryBuilder().query(
            `CALL gds.graph.drop('network')
            YIELD graphName`
        ).setData('executeWrite');
    }
}