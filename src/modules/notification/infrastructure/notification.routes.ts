import RouterConfigurator from "@common/routes/RouterConfigurator";
import IHandleDomain from "@common/types/IHandleDomain";
import { HttpMethods } from "@common/emun/HttpMethod";
import ListNotificationController from "./controller/listNotification/ListNotificationController";
import DeleteNotificationController from "./controller/deleteNotification/DeleteNotificationController";


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
                },
                {
                    method: HttpMethods.DELETE,
                    path: '/:id',
                    controller: DeleteNotificationController,
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
