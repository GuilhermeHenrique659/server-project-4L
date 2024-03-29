import { HttpMethods } from "@common/emun/HttpMethod";
import RouterConfigurator from "@common/routes/RouterConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import TagValidation from "./validation/TagValidation";
import SearchTagController from "./controller/SearchTagController/SearchTagController";


class TagRouter implements IHandleDomain {
    constructor(private readonly _routerConfig: RouterConfigurator,
        private readonly _validator: TagValidation) { }

    public setUpHandles(): void {
        this._routerConfig.prefix = 'tag';
        this._routerConfig.routesConfig = [
            {
                method: HttpMethods.GET,
                controller: SearchTagController,
                path: '/:searchTerm',
                middleware: {
                    validator: this._validator.searchTagValidate()
                }
            }
        ];
    }

    get handle(): RouterConfigurator {
        return this._routerConfig;
    }
}

const tagRouter = new TagRouter(new RouterConfigurator(), new TagValidation());

export default tagRouter;