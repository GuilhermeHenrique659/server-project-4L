import Tag from "../entity/Tag";

interface ITagRepository {
    store(tag: Tag): Promise<Tag>;
    findByDescription(description: string): Promise<Tag | undefined>;
    findById(id: string): Promise<Tag | undefined>;
}

export default ITagRepository;