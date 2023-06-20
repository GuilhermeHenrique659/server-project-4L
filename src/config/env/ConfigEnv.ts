import dotenv from 'dotenv';

dotenv.config();

export default class ConfigEnv {
    static getPort(): number {        
        return Number(process.env.PORT) ?? 3001
    }

    static getIpServer() {
        return process.env.IP ?? '0.0.0.0'
    }

    static getDBConnection() {        
        return {
            conn: process.env.DB_CONNECTION ?? 'neo4j://localhost:7687',
            user: process.env.DB_USER ?? 'neo4j',
            password: process.env.DB_PASSWORD ?? 'admin123',
        };
    }
}