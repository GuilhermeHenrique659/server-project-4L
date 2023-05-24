import { nodeCacheDataBase } from "@common/database/MemoryDataBase";
import { database } from "@common/database/neo4j/DataBase";
import Application from "@common/server/Application";
import { userRouter } from "@modules/user/infra/User.routes";
import express from "express";

const app = new Application(express(), nodeCacheDataBase, database, [userRouter], [])
app.run()