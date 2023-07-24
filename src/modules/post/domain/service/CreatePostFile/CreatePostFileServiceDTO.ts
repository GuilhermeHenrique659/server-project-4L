import Post from "../../entity/Post"

export type CreatePostFileServiceDTO = {
    post: Post,
    file: {
        data: string,
        type: string
    }
}