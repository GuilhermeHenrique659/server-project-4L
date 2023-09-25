import dotenv from 'dotenv';

dotenv.config();

export default class ConfigEnv {
    static getPort(): number {
        return Number(process.env.PORT) ?? 3001
    }

    static getIpServer() {
        return process.env.IP ?? '0.0.0.0'
    }

    static getUseDBAlgorithmic() {
        return !!process.env.DB_ALGO ?? false;
    }

    static getBucketName() {
        return process.env.AWS_S3_BUCKET as string;
    }

    static getAwsRegion() {
        return process.env.AWS_REGION as string;
    }

    static getAwsKey() {
        return process.env.AWS_ACCESS_KEY_ID as string;
    }

    static getAwsSecret() {
        return process.env.AWS_SECRET_ACCESS_KEY as string;
    }

    static getDBConnection() {
        return {
            conn: process.env.DB_CONNECTION ?? 'neo4j://localhost:7687',
            user: process.env.DB_USER ?? 'neo4j',
            password: process.env.DB_PASSWORD ?? 'admin123',
        };
    }
}