import RouterConfigurator from "@common/routes/RouterConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import { HttpMethods } from "@common/emun/HttpMethod";
import { HttpReturnMethods } from "@common/emun/HttpReturnMethods";
import ListNotificationController from "./controller/listNotification/ListNotificationController";


class NotificationRouter implements IHandleDomain {
    constructor(private router: RouterConfigurator) { }

    setUpHandles(): void {
        this.router.prefix = 'notification',
            this.router.routesConfig = [
                {
                    method: HttpMethods.GET,
                    path: '/',
                    controller: ListNotificationController,
                    middleware: {
                        isAuthenticate: true,
                    }
                }
            ]
    }


    get handle(): RouterConfigurator {
        return this.router;
    }
}

const notificationRouter = new NotificationRouter(new RouterConfigurator());
export default notificationRouter;
