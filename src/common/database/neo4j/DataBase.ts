import { DataBaseConnectionConfig } from '@common/types/DataBaseConnectionConfig';
import neo4j, { Driver } from 'neo4j-driver'

export default class DataBase {
    private _driver: Driver;

    constructor (private _connectionConfig: DataBaseConnectionConfig) {
        this.getConnection()
    }

    public getDriver(){        
        return this._driver;
    }

    public async getConnection() {
        try {
            this._driver = neo4j.driver(this._connectionConfig.conn, 
                neo4j.auth.basic(
                    this._connectionConfig.user,
                    this._connectionConfig.password
                ));
            const serverInfo = await this._driver.getServerInfo();
            console.log('Connection estabilished');
            console.log(serverInfo);
        }catch (err) {
            console.log(`Connection error\n${err}\n`);
        }
        return this._driver
    }
}