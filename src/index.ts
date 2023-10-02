import "reflect-metadata";
import { nodeCacheDataBase } from "@common/database/MemoryDataBase";
import Application from "@common/server/Application";
import database from "@config/database/DatabaseConnection";
import communityListener from "@modules/community/infrastructure/community.listeners";
import communityRouter from "@modules/community/infrastructure/community.routes";
import postListener from "@modules/post/infrastructure/post.listener";
import postRouter from "@modules/post/infrastructure/post.routes";
import tagRouter from "@modules/tag/infrastructure/Tag.routes";
import { userRouter } from "@modules/user/infrastructure/User.routes";
import express from "express";
import commentListener from "@modules/comments/infrastructure/comment.listener";
import userListener from "@modules/user/infrastructure/User.listener";
import notificationRouter from "@modules/notification/infrastructure/notification.routes";


const app = new Application(express(), nodeCacheDataBase, database,
    [userRouter, postRouter, tagRouter, communityRouter, notificationRouter],
    [postListener, communityListener, commentListener, userListener]
);
try {
    app.run();
} catch (err) {
    console.log(`server stop, reson ${err}, retry start`);
    app.run();
}