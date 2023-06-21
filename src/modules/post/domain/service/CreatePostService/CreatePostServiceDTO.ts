import Post from "../../entity/Post"

export type CreatePostServiceDTO = Pick<Post, 'content'> & {
    userId: string

}