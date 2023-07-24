import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";
import TagControllerFactory from "./TagControllerFactory";
import TagRepository from "../repository/TagRepository";
import GetDatasource from "@common/helpers/GetDataSource";
import Tag from "@modules/tag/domain/entity/Tag";


const tagRepository = new TagRepository(GetDatasource(Tag));
const tagServiceFactory = new TagServiceFactory(tagRepository);
const tagControllerFactory = new TagControllerFactory(tagServiceFactory);

export default tagControllerFactory;