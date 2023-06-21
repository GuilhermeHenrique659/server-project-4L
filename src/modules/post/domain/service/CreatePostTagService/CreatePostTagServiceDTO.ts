import Tag from "@modules/tag/domain/entity/Tag"
import Post from "../../entity/Post"

export type CreatePostTagServiceDTO = {
    post: Post
    tag: Tag
}