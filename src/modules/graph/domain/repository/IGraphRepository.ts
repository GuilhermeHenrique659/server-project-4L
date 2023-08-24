import IEdge from "@common/database/datasource/types/IEdge";
import Graph from "../entity/Graph";

export interface IGraphRepository {
    generateNewGraph(graphname: string): Promise<Graph>;
    dropGraph(graphname: string): Promise<void>;
}