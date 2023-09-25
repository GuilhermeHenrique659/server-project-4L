import path from "path";
import crypto from "crypto";
import ConfigEnv from "@config/env/ConfigEnv";

const uploadFolder = path.resolve(__dirname, "..", "..", "..", "static");

export default {
    directory: uploadFolder,
    bucket: ConfigEnv.getBucketName(),
    options: {
        region: ConfigEnv.getAwsRegion(),
        apiVersion: '2006-03-01',
        credentials: {
            accessKeyId: ConfigEnv.getAwsKey(),
            secretAccessKey: ConfigEnv.getAwsSecret(),
        }
    },
    storage: {
        filename: () => crypto.randomBytes(10).toString("hex"),
    },
}