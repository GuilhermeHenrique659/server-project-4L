import ConfigEnv from '@config/env/ConfigEnv';
import neo4j, { Driver } from 'neo4j-driver'

export default class DataBase {
    private _driver: Driver;

    public getDriver(){        
        return this._driver;
    }

    public async getConnection() {
        try {
            this._driver = neo4j.driver(ConfigEnv.getDBConnection().conn, 
                neo4j.auth.basic(
                    ConfigEnv.getDBConnection().user, 
                    ConfigEnv.getDBConnection().password,
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

export const database = new DataBase();