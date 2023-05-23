import RouterConfigurator from "@common/routes/RouterConfigurator";
import SocketConfigurator from "@common/socket/SocketConfigurator";

export default interface IHandleDomain {
    setUpHandles(): void;
    get handle(): RouterConfigurator | SocketConfigurator;
}