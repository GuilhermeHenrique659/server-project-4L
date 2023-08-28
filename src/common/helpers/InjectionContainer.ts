import IUserRepository from "@modules/user/domain/repository/IUserRepository";
import UserRepository from "@modules/user/infrastructure/repository/UserRepository";
import { container } from "tsyringe";
import GetDatasource from "./GetDataSource";
import User from "@modules/user/domain/entity/User";
import IHashProvider from "@common/provider/hash/IHashProvider";
import MockHashProvider from "@common/provider/hash/MockHashProvider";
import PostRepository from "@modules/post/infrastructure/repository/PostRepository";
import CommunityRepository from "@modules/community/infrastructure/repository/CommunityRepository";
import FileRepository from "@modules/file/infrastructure/repository/FileRepository";
import TagRepository from "@modules/tag/infrastructure/repository/TagRepository";
import Tag from "@modules/tag/domain/entity/Tag";
import File from "@modules/file/domain/entity/File";
import Community from "@modules/community/domain/entity/Community";
import Post from "@modules/post/domain/entity/Post";
import IPostRepository from "@modules/post/domain/repository/IPostRepository";
import ICommunityRepository from "@modules/community/domain/repository/ICommunityRepository";
import IFileRepository from "@modules/file/domain/repository/IFileRepository";
import ITagRepository from "@modules/tag/domain/repository/ITagRepository";
import LocalFileProvider from "@common/provider/file/LocalFileProvider";
import IFileProvider from "@common/provider/file/IFileProvider";
import { Provider, Repository } from "@common/emun/InjectionsEmun";
import { Type } from "@common/types/DecoractorType";
import { Transaction } from "neo4j-driver";

class Injection {
    static resolve<T>(target: Type<T>, tx?: Transaction): T {
        if (tx) {
            container.register<IUserRepository>(Repository.UserRepository, { useValue: new UserRepository(GetDatasource(User, tx)) });
            container.register<IPostRepository>(Repository.PostRepository, { useValue: new PostRepository(GetDatasource(Post, tx)) });
            container.register<ICommunityRepository>(Repository.CommunityRepository, { useValue: new CommunityRepository(GetDatasource(Community, tx)) });
            container.register<IFileRepository>(Repository.FileRepository, { useValue: new FileRepository(GetDatasource(File, tx)) });
            container.register<ITagRepository>(Repository.TagRepository, { useValue: new TagRepository(GetDatasource(Tag, tx)) });
        }
        container.register<IHashProvider>(Provider.HashProvider, MockHashProvider);
        container.register<IFileProvider>(Provider.FileProvider, LocalFileProvider);

        return container.resolve(target);
    }
}


export default Injection;


