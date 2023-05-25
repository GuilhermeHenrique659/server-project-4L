import { nodeCacheDataBase } from "@common/database/MemoryDataBase";
import Application from "@common/server/Application";
import database from "@config/database/DatabaseConnection";
import { userRouter } from "@modules/user/infra/User.routes";
import express from "express";

const app = new Application(express(), nodeCacheDataBase, database, [userRouter], [])
app.run()