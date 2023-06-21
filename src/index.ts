import { nodeCacheDataBase } from "@common/database/MemoryDataBase";
import Application from "@common/server/Application";
import database from "@config/database/DatabaseConnection";
import postRouter from "@modules/post/infrastructure/post.routes";
import { userRouter } from "@modules/user/infrastructure/User.routes";
import express from "express";


const app = new Application(express(), nodeCacheDataBase, database, [userRouter, postRouter], [])
app.run()