import DataBase from '@common/database/neo4j/DataBase';
import RouterConfigurator from '@common/routes/RouterConfigurator';
import SocketConfigurator from '@common/socket/SocketConfigurator';
import IHandleDomain from '@common/types/IHandleDomain';
import ConfigEnv from '@config/env/ConfigEnv';
import AWS, { S3, GetObjectCommand } from '@aws-sdk/client-s3'
import cors from 'cors';
import express, { Express } from 'express'
import http from 'http'
import uploadConfig from "@config/upload/s3config";
import fs from 'fs'
import { Readable } from 'stream'
import AppError from '@common/errors/AppError';


export default class Application {
    private _server: http.Server;
    private _routes: IHandleDomain[];
    private _sockets: IHandleDomain[];
    private _app: Express;
    private _cacheDataBase: IMemoryDataBase;
    private _database: DataBase

    constructor(app: Express, cacheDataBase: IMemoryDataBase, database: DataBase, routes: IHandleDomain[], sockets: IHandleDomain[]) {
        this._app = app;
        this._routes = routes;
        this._sockets = sockets;
        this._cacheDataBase = cacheDataBase;
        this._database = database;
    }

    private setupAllHandles() {
        const handles = [...this._routes, ...this._sockets];
        handles.forEach(handle => handle.setUpHandles());
    }

    private setupRoutes() {
        if (this._routes.length) {
            this._routes.forEach(route => {
                const handle = route.handle as RouterConfigurator
                console.log(`====>[${handle.getPrefix()}]<==== - configure all routes:`);
                handle.inicializeRoutes();
                this._app.use(`/${handle.getPrefix()}`, handle.getRouter())
            });
        } else {
            console.log('Routes is empty');
        }
    }

    private setupSocket() {
        const config = SocketConfigurator.getInstance();
        config.attachServer(this._server);
        config.database = this._cacheDataBase;
        config.inicializerSocket();
    }

    private setupApplication() {
        this._app.use(express.json({ limit: '20mb' }));
        this._app.use('/file/:filename', async (req, res) => {
            try {
                let attemps = 0;
                const handle = async () => {
                    const s3 = new S3(uploadConfig.options);

                    const data = await s3.getObject({
                        Bucket: uploadConfig.bucket,
                        Key: req.params.filename
                    });


                    if (!data || !data.Body) {
                        if (attemps < 3) {
                            ++attemps;
                            await handle();
                        } else {
                            throw new AppError('Image not found');
                        }
                    }

                    const stream = Readable.from(data.Body as unknown as Iterable<any>);
                    stream.pipe(res);
                }
                await handle();
            } catch (err) {
                return fs.createReadStream(uploadConfig.directory + '/image-not-found-icon.png').pipe(res)
            }
        });
        this._app.use(cors());
        this.setupRoutes();
    }

    public async run() {
        console.log('Starting server...')
        await this._database.isConnect()
        this.setupAllHandles()
        this.setupApplication();
        this._server = http.createServer(this._app);
        this.setupSocket()

        this._server.listen(ConfigEnv.getPort(), ConfigEnv.getIpServer(), () => {
            console.log(`Server start in the port: ${ConfigEnv.getPort()}`);
        })
    }
}