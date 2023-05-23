export default class ConfigEnv {
    static getPort() {
        return 3001
    }

    static getIpServer() {
        return '0.0.0.0'
    }

    static getDBConnection() {
        return {
            conn: 'neo4j://localhost:7687',
            user: 'neo4j',
            password: 'admin123',
        };
    }
}