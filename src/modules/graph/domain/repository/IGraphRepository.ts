import Graph from "../entity/Graph";

export interface IGraphRepository {
    generateNewGraph(): Promise<Graph>;
    dropGraph(graphname: string): Promise<void>;
}