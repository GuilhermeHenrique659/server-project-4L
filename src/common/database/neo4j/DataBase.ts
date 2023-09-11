import { DataBaseConnectionConfig } from '@common/types/DataBaseConnectionConfig';
import neo4j, { Driver } from 'neo4j-driver'

export default class DataBase {
    private _driver: Driver;

    constructor(private _connectionConfig: DataBaseConnectionConfig) {
        this.getConnection()
    }

    public getDriver() {
        return this._driver;
    }

    public async isConnect(): Promise<void> {
        await this._driver.getServerInfo();
        const serverInfo = await this._driver.getServerInfo();
        console.log('Connection estabilished');
        console.log(serverInfo);
    }

    private getConnection() {
        try {
            this._driver = neo4j.driver(this._connectionConfig.conn,
                neo4j.auth.basic(
                    this._connectionConfig.user,
                    this._connectionConfig.password
                ));

        } catch (err) {
            Error("Connection enclosed")
            console.log(`Connection error\n${err}\n`);
        }
        return this._driver
    }
}