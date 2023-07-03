import { IGraphRepository } from "../repository/IGraphRepository";
import GenerateGraphService from "./GenerateGraphService/GenereteGraphService";

class GraphServiceFactory {
    constructor (private readonly _graphRepository: IGraphRepository) {}

    public getGenerateGraph(){
        return new GenerateGraphService(this._graphRepository);
    }
}

export default GraphServiceFactory;