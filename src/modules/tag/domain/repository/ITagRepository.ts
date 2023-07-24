import Tag from "../entity/Tag";

interface ITagRepository {
    store(tag: Tag): Promise<Tag>;
    findByDescription(description: string): Promise<Tag | undefined>;
    findById(id: string): Promise<Tag | undefined>;
    search(searchTerm: string): Promise<Tag[]>;
}

export default ITagRepository;